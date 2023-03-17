echo "欢迎使用前端页面自动部署工具。---测试服"
echo "正在部署..."

echo "**************** 开始打包 ********************"
npm run build:h5
if [ ! $? -eq 0 ];then
echo "打包失败，请检查原因后重新尝试"
exit
fi

echo "**************** 复制小程序文件到打包目录 ********************"
cp ./conf/wUAftuPcQ1.txt ./dist/build/h5/

echo "**************** 开始打包镜像 ********************"
version=`date +%Y%m%d`-2
docker build -t ccr-cn-hangzhou.unicloudsrv.com/int-dev/smarthub-meeting-h5:$version .
if [ ! $? -eq 0 ];then
echo "镜像打包失败，请检查原因后重新尝试"
exit
fi

echo "**************** 开始上传镜像 ********************"
docker push ccr-cn-hangzhou.unicloudsrv.com/int-dev/smarthub-meeting-h5:$version