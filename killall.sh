#!/bin/bash
echo "----------killall start----------"
PID_LIST=(`ps -ef | grep -E 'java.*dt-mic' |grep -v -E 'grep|SCREEN|bash' | awk '{print $2}'`)
echo 'running server process count:' ${#PID_LIST[*]}
if [ 0 -ne ${#PID_LIST[*]} ]
then
    for PID in "${PID_LIST[@]}"
    do
        echo "kill process $PID"
		kill -15 "$PID"
		waitcnt=0
		while [ -e /proc/$PID ]
		do
			if [ $waitcnt -eq 10 ]
			then
				break
			fi
			waitcnt=$(($waitcnt+1))
			echo "Process: $PID is still running... waiting count:$waitcnt"
			sleep .6
		done
		echo "kill process $PID is done"
    done
else
    echo 'kill nothing'
fi
echo "----------killall finish----------"