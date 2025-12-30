#!/bin/bash
$@ &
PID=$!
sleep 1
ps -p $PID -o rss=,vsz=,comm=
sleep 1
if ps -p $PID > /dev/null; then
   kill $PID
fi
