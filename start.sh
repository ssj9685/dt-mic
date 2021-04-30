#!/bin/bash
echo "----------server start----------"
PID_LIST=(`ps -ef | grep -E 'java.*dt-mic' |grep -v -E 'grep|SCREEN|bash' | awk '{print $2}'`)
echo 'running server process:' ${#PID_LIST[*]}
if [ 0 -ne ${#PID_LIST[*]} ]
then
    exit 1
else
    echo 'check'
fi
cd ./target
echo "current dir:`pwd`"
screen -dmS dt-mic-server java -Du=dt-mic -jar -Xms512M -Xmx512M -server dt-mic-server.jar
echo "----------server start finish----------"