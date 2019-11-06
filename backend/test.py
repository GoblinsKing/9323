import os
import sys
with open(os.path.join('users.csv')) as f:
    for line in f.readlines():
        line = line.strip().split(',')
        print(line[2])