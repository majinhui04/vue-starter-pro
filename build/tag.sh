#!/usr/bin/env sh
set -e
echo "正常发版请升级中间版本号，紧急修复请选择最后一位版本号"
NOW=$(date "+%F.%H.%M")
DATE=`date +%Y%m%d`
# 默认分支为当前分支
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

 # ***********目前大部分项目不允许使用命令行操作master代码，以下代码暂时废弃************** #
  # 用户确认目标分支 https://ask.helplib.com/bash/post_113951
  BRANCH="master"

  read -p"Target branch: master. (y: confirm; n: enter the target branch; c: cancel) " -n 1 -r
  echo "\n"

  case $REPLY in
    y)
     ;;
    n)
       read -p"Please enter the target branch (For example, master): " -r
       BRANCH=$REPLY
     ;;
     *)
       echo "canceled"
       exit 5
     ;;
   esac

# 切到branch
  git -C "${REPO}" checkout $BRANCH
  # 合并分支到branch
  git -C "${REPO}" merge $CURRENT_BRANCH

    npm run tag
    git add -A
   git commit -m "docs: ${NOW} v${VERSION}" --no-verify

   VERSION=`npx select-version-cli`
   echo    # (optional) move to a new line

  # build
  VERSION=$VERSION
  npm version $VERSION --message "chore: ${NOW} v${VERSION}"
  git tag --delete "v${VERSION}"
  git tag -a "v${VERSION}"
  git checkout $CURRENT_BRANCH
  git rebase $BRANCH

    echo "v$VERSION 已完成 ..."
