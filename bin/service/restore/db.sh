#!/usr/bin/env bash
##
#   Restore MySQL database.
##
# root directory (relative to the current shell script, not to the execution point)
DIR_ROOT=${DIR_ROOT:-$(cd "$(dirname "$0")/../../../" && pwd)}
DIR_THIS=$(cd "$(dirname "$0")" && pwd)
# include commons for standalone running
. "${DIR_ROOT}/bin/commons.sh"

## =========================================================================
#   Setup working environment
## =========================================================================
# check external vars used in this script (see cfg.work.sh)
: "${DB_NAME:?}"
: "${DB_PASS:?}"
: "${DB_USER:?}"
: "${DIR_STORE:?}"
# locally used vars
export DIR_BAK_DB="${DIR_STORE}/db"
FILE_DUMP="teq_db"
PATH_DUMP=${DIR_BAK_DB}/${FILE_DUMP}
PATH_DUMP_ZIP=${DIR_BAK_DB}/${FILE_DUMP}.tar.gz
MYSQL_EXEC="mysql -h ${DB_HOST} -u ${DB_USER} --password=${DB_PASS} -D ${DB_NAME} -e "

info ""
info "************************************************************************"
info "DB restore process is started (${PATH_DUMP})."
info "************************************************************************"

## =========================================================================
#   Perform processing
## =========================================================================
info "Extract dump from archive (${PATH_DUMP_ZIP})."
tar -zxf "${PATH_DUMP_ZIP}" -C "${DIR_BAK_DB}"

## =========================================================================
#   Check extracted dump and prepare it for restore
## =========================================================================
if test ! -e "${PATH_DUMP}"; then
  info "'${PATH_DUMP}' does not exist. Place MySQL DB dump to '${PATH_DUMP}' and launch this script again."
  exit 2
fi

## =========================================================================
#   Drop DB and restore it from the dump
## =========================================================================
info "Restoring MySQL DB '${DB_NAME}' from dump '${PATH_DUMP}'..."
${MYSQL_EXEC} "drop database if exists ${DB_NAME}"
mysql -h "${DB_HOST}" -u "${DB_USER}" --password="${DB_PASS}" -e "create database ${DB_NAME} character set utf8 collate utf8_unicode_ci"
${MYSQL_EXEC} "source ${PATH_DUMP}"

info ""
info "DB '${DB_NAME}' is restored."

## =========================================================================
#   Cleanup extracted dump (leave ZIP only on the disk)
## =========================================================================
info ""
info "Remove plain dump '${PATH_DUMP}' to free disk space."
rm -f "${PATH_DUMP}"

info ""
info "========================================================================="
info "  Database replication is complete."
info "========================================================================="
