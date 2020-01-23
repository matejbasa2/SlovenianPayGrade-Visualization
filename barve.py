import csv
import io

mesto = [] 
cena = [] #700 - 1100
cena2 = []
barva=["#D3DCFB","#ACBFFB","#7797FB","#4B73F6","#043FFE"]
tmp=0
index=0
a=""

with open('cas.csv') as csv_file:  
    csv_reader = csv.reader(csv_file, delimiter=',')  
    line_count = 0  
    for row in csv_reader:  
        if line_count == 14:  
            print(row)
            cena=row
        if line_count == 0:  
            print(row)
            mesto=row
        line_count += 1  

for i in range(len(cena)):
    cena[i] = cena[i].replace("'","")
    cena2.append(cena[i])
	
for i in range(len(cena2)):
    print(cena2[i])
print(cena2)

with io.open('slovenia.js', 'r', encoding='utf8') as f_in:
    with io.open('ss.js', 'w', encoding='utf8') as f_out:
        for line in f_in:
            if "name" in line:
                tmp=0
                for i in range(len(mesto)):
                    if mesto[i] in line:
                        print(line)
                        tmp=1
                        index=i
            if "color" in line:
                if tmp == 1:
                    print(mesto[index])
                    print(cena[index])
                    print(line)
                    a=line
                    x=line
                    
                    if float(cena2[index])>700 and float(cena2[index])<800:
                        if "#59798e" in x:
                            a=x.replace("#59798e",barva[0])
                        if "#B12401" in x:
                            a=x.replace("#B12401",barva[0])
                        if "#9a9a68" in x:
                            a=x.replace("#9a9a68",barva[0])
                    if float(cena2[index])>800 and float(cena2[index])<900:
                        if "#59798e" in x:
                            a=x.replace("#59798e",barva[1])
                        if "#B12401" in x:
                            a=x.replace("#B12401",barva[1])
                        if "#9a9a68" in x:
                            a=x.replace("#9a9a68",barva[1])
                    if float(cena2[index])>900 and float(cena2[index])<1000:
                        if "#59798e" in x:
                            a=x.replace("#59798e",barva[2])
                        if "#B12401" in x:
                            a=x.replace("#B12401",barva[2])
                        if "#9a9a68" in x:
                            a=x.replace("#9a9a68",barva[2])
                    if float(cena2[index])>1000 and float(cena2[index])<1100:
                        print("tuki")                        
                        if "#59798e" in x:
                            a=x.replace("#59798e",barva[3])
                        if "#B12401" in x:
                            a=x.replace("#B12401",barva[3])
                        if "#9a9a68" in x:
                            a=x.replace("#9a9a68",barva[3])
                    if float(cena2[index])>1100:
                        if "#59798e" in x:
                            a=x.replace("#59798e",barva[4])
                        if "#B12401" in x:
                            a=x.replace("#B12401",barva[4])
                        if "#9a9a68" in x:
                            a=x.replace("#9a9a68",barva[4])
                    print(a)
                tmp=0
                index=0
                f_out.write(a)
            else:
                f_out.write(line)
