import os
from pprint import pprint

sum_ = {
    'vue': 0,
    'ts': 0,
    'js': 0,
    'css': 0
}

for source, dirs, files in os.walk('src'):
    for file in files:
        if not file.endswith(('vue', 'ts', 'js', 'css')):
            continue
        with open(os.path.join(source, file), 'r+') as f:
            content = f.readlines()
            sum_[file.split('.')[-1]] += len(content)

pprint(sum_)