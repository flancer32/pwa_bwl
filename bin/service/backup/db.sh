#!/usr/bin/env bash
##
#   Backup database.
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
PATH_LR_SOURCE="${DIR_THIS}/logrotate.tmpl.conf"
PATH_LR_TARGET="${DIR_BAK_DB}/logrotate.conf"

info ""
info "************************************************************************"
info "DB image creation is started (${PATH_DUMP})."
info "************************************************************************"

## =========================================================================
#   Perform processing
## =========================================================================
info ""
# create dump directory if not exists
mkdir -p "${DIR_BAK_DB}"
info "Dumping db '${DB_NAME}' into '${PATH_DUMP}'..."
mysqldump --add-locks \
  --lock-tables \
  --skip-quick \
  --skip-tz-utc \
  --user="${DB_USER}" \
  --password="${DB_PASS}" \
  "${DB_NAME}" >"${PATH_DUMP}"
info "Remove old dump '${PATH_DUMP_ZIP}'."
rm -f "${PATH_DUMP_ZIP}"
info "Compressing dump into '${PATH_DUMP_ZIP}'..."
tar -zcf "${PATH_DUMP_ZIP}" -C "${DIR_BAK_DB}" "${FILE_DUMP}"
info "Remove plain dump '${PATH_DUMP}'."
rm "${PATH_DUMP}"

# rotate using logrotate
if test ! -f "${PATH_LR_TARGET}"; then
  envsubst <"${PATH_LR_SOURCE}" >"${PATH_LR_TARGET}"
fi
if test ! -d "${DIR_BAK_DB}/old"; then
  mkdir -p "${DIR_BAK_DB}/old"
fi

info "Rotate images using '${PATH_LR_TARGET}'."
/usr/sbin/logrotate -s "${DIR_BAK_DB}/old/status" "${PATH_LR_TARGET}"

# TMP: remove logrotate config to re-generate it
#rm "${PATH_LR_TARGET}"

info ""
info "************************************************************************"
info "DB image creation is completed."
info "************************************************************************"
