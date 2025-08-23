import os

folder = os.getcwd()  # 取得目前資料夾
for filename in os.listdir(folder):
    if filename.endswith('.png'):
        name, ext = os.path.splitext(filename)
        new_name = f"{name}_2{ext}"
        os.rename(os.path.join(folder, filename), os.path.join(folder, new_name))