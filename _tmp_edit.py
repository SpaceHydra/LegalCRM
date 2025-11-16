from pathlib import Path
path = Path("advocates-management.html")
text = path.read_text()
target = "            <div class=\"header-actions\">\r\n                <button class=\"btn btn-primary\" onclick=\"openAddAdvocateModal()\">\r\n                    " + chr(65533) + "z" + chr(7) + " Add New Advocate\r\n                </button>\r\n                <a href=\"dashboard.html\" class=\"btn btn-secondary\">Back to Dashboard</a>\r\n            </div>"
replacement = "            <div class=\"header-actions\">\r\n                <a class=\"btn btn-primary\" href=\"add-advocate.html\">\r\n                    " + chr(65533) + "z" + chr(7) + " Add New Advocate\r\n                </a>\r\n            </div>"
if target not in text:
    raise SystemExit('target block not found')
text = text.replace(target, replacement, 1)
path.write_text(text)
