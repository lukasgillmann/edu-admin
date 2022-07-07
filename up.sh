git switch dev
git add .
comment=${1:--}
git commit -m "$comment"
git push origin dev