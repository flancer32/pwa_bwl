#!/usr/bin/env bash
##
#   Rebuild JS project with modules being placed to inner folders.
##
# root directory (relative to the current shell script, not to the execution point)
DIR_ROOT=${DIR_ROOT:-$(cd "$(dirname "$0")/../../" && pwd)}
DIR_NODE="${DIR_ROOT}/node_modules"
DIR_OWN="${DIR_ROOT}/own_modules"

echo "Remove installed dependencies and lock file."
rm -fr "${DIR_NODE}" "${DIR_ROOT}/package-lock.json"

echo "Re-install JS project."
cd "${DIR_ROOT}" || exit 255
npm install

echo "Remove cloned dependencies (sources)."
#rm -fr "${DIR_OWN}/@teqfw"
#rm -fr "${DIR_OWN}/@flancer32"

echo "Clone dependencies from github to inner folders."
mkdir -p "${DIR_OWN}/@teqfw/"
mkdir -p "${DIR_OWN}/@flancer32/"
git clone git@github.com:flancer32/teq_user.git "${DIR_OWN}/@flancer32/teq_user"
git clone git@github.com:teqfw/core.git "${DIR_OWN}/@teqfw/core"
git clone git@github.com:teqfw/di.git "${DIR_OWN}/@teqfw/di"
git clone git@github.com:teqfw/email.git "${DIR_OWN}/@teqfw/email"
git clone git@github.com:teqfw/http2.git "${DIR_OWN}/@teqfw/http2"
git clone git@github.com:teqfw/i18n.git "${DIR_OWN}/@teqfw/i18n"
git clone git@github.com:teqfw/ui-quasar.git "${DIR_OWN}/@teqfw/ui-quasar"
git clone git@github.com:teqfw/vue.git "${DIR_OWN}/@teqfw/vue"
git clone git@github.com:teqfw/web.git "${DIR_OWN}/@teqfw/web"

echo "Remove node modules and link cloned sources."
rm -fr "${DIR_NODE}/@flancer32/teq_user" && ln -s "${DIR_OWN}/@flancer32/teq_user" "${DIR_NODE}/@flancer32/teq_user"
rm -fr "${DIR_NODE}/@teqfw/core" && ln -s "${DIR_OWN}/@teqfw/core" "${DIR_NODE}/@teqfw/core"
rm -fr "${DIR_NODE}/@teqfw/di" && ln -s "${DIR_OWN}/@teqfw/di" "${DIR_NODE}/@teqfw/di"
rm -fr "${DIR_NODE}/@teqfw/email" && ln -s "${DIR_OWN}/@teqfw/email" "${DIR_NODE}/@teqfw/email"
rm -fr "${DIR_NODE}/@teqfw/http2" && ln -s "${DIR_OWN}/@teqfw/http2" "${DIR_NODE}/@teqfw/http2"
rm -fr "${DIR_NODE}/@teqfw/i18n" && ln -s "${DIR_OWN}/@teqfw/i18n" "${DIR_NODE}/@teqfw/i18n"
rm -fr "${DIR_NODE}/@teqfw/ui-quasar" && ln -s "${DIR_OWN}/@teqfw/ui-quasar" "${DIR_NODE}/@teqfw/ui-quasar"
rm -fr "${DIR_NODE}/@teqfw/vue" && ln -s "${DIR_OWN}/@teqfw/vue" "${DIR_NODE}/@teqfw/vue"
rm -fr "${DIR_NODE}/@teqfw/web" && ln -s "${DIR_OWN}/@teqfw/web" "${DIR_NODE}/@teqfw/web"

echo "Done."
