file1 = open("breakfast.csv", "r", encoding='utf-8')
file2 = open("main.csv", "r", encoding='utf-8')
file3 = open("dessert.csv", "r", encoding='utf-8')

fileout = open("final.csv", "w", encoding='utf-8')

for line in file1.readlines():
    fileout.write(line)

count = 0
for line in file2.readlines():
    if count != 0:
        fileout.write(line)
    count += 1

count = 0
for line in file3.readlines():
    if count != 0:
        fileout.write(line)
    count += 1

file1.close()
file2.close()
file3.close()
fileout.close()