#!/usr/bin/env bash
##
#   Clone project from git and copy deployment configuration inside then launch the deployment script.
#
#   Copy this file to root of installation folder (/home/live/inst/).
#   Configuration files `local.json` & `local.sh` are expected in the root folder.
#
#   Files and folders in the root folder:
#      -rwxrwxr-x 1 live live  305 Jan  5 16:46 clone.sh
#      drwxrwxr-x 9 live live 4.0K Jan  5 16:47 teq_20210105
#      lrwxrwxrwx 1 live live   14 Jan  5 15:43 live -> teq_20210105
#      -rw-rw-r-- 1 live live  591 Jan  5 15:40 local.json
#      -rwxrwxr-x 1 live live  409 Jan  5 15:40 local.sh
##
REPO="git@github.com:flancer32/pwa_app.git"
SUFFIX="$(date '+%Y%m%d')"
DIR_PRJ="teq_${SUFFIX}"

git clone "${REPO}" "${DIR_PRJ}"
cp local.json "${DIR_PRJ}/cfg/"
cp local.sh "${DIR_PRJ}/cfg/"
cd "${DIR_PRJ}" || exit
bash ./bin/deploy/live.sh
cd ..
unlink live && ln -s "${DIR_PRJ}" live
