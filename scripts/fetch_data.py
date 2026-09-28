import csv
import io
import json
import os
import time
import urllib.request

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "sheets_config.json")
OUTPUT_ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "assets")


def fetch_csv(spreadsheet_id, gid):
    url = f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/export?format=csv&gid={gid}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        raw = resp.read().decode("utf-8-sig")  # 處理 BOM
    return raw


def csv_to_rows(csv_text):
    reader = csv.reader(io.StringIO(csv_text))
    return list(reader)


def merge_sheets(spreadsheet_id, gids):
    combined_rows = []
    headers = None

    for gid in gids:
        raw = fetch_csv(spreadsheet_id, gid)
        rows = csv_to_rows(raw)

        if not rows:
            continue

        if headers is None:
            headers = rows[0]
            combined_rows.extend(rows)
        else:
            combined_rows.extend(rows[1:])

        time.sleep(1)

    return combined_rows


def rows_to_json(rows):
    if not rows:
        return []
    headers = rows[0]
    result = []
    for row in rows[1:]:
        obj = {}
        for idx, header in enumerate(headers):
            obj[header] = row[idx] if idx < len(row) else ""
        if obj.get("id"):
            result.append(obj)
    return result


def main():
    with open(CONFIG_PATH, encoding="utf-8") as f:
        config = json.load(f)

    for topic, info in config.items():
        print(f"處理 {topic} ...")
        rows = merge_sheets(info["spreadsheetId"], info["gids"])
        data = rows_to_json(rows)

        output_dir = os.path.join(OUTPUT_ROOT, topic)
        os.makedirs(output_dir, exist_ok=True)

        output_path = os.path.join(output_dir, "data.json")
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"  完成，共 {len(data)} 筆，輸出到 {output_path}")


if __name__ == "__main__":
    main()