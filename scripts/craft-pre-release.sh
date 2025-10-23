set -eux
# Move to the project root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR/..
OLD_VERSION="${1}"
NEW_VERSION="${2}"
# Do not tag and commit changes made by "npm version"
npm version "${NEW_VERSION}" --no-git-tag-version

 