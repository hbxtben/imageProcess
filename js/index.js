$(function() {
    //控制面板上划

    //原图-preImg 操作后图-afterImg
    var preImg = document.getElementById("preImg");
    var afterImg = document.getElementById("afterImg");


    $(".config-up").click(function () {
        $("#config").slideUp(200);
    });

    $(".open-config").click(function (event) {
        $("#config").slideDown(200);
        //清除控制屏，添加图片按钮
        $("#config-items").empty();
        //解决非线性变换的问题
        calUtils.fun = undefined;
    });

    //为每个选择按钮添加
    $(".remove-effect").click(function () {
        var afterimg = $("#afterImg")[0];
        afterimg.style = "";
        afterimg.classList = [];
    });

    $(".open-config").click(function (event) {
        if (event.target.id === "BMPwt" || event.target.id === "JPEGwt") {
            var node = "<input type='file' id='myfile'>";
            if ($("#myfile").length === 0) {
                $("#config-items").append(node);
            }
            // 修改图片
            $("#myfile")[0].addEventListener("change", eventUtil.imgShow, false);
        }
    });

    $("#transform").click(function(event){
        var nodeId = event.target.id;
        switch(nodeId) {
            case 'translate' : {
                var nodel = "<button type='button' id='transLeft'>向左移入</button>",
                    noder = "<button type='button' id='transRight'>向右移入</button>",
                    nodet = "<button type='button' id='transTop'>向上移入</button>",
                    nodeb = "<button type='button' id='transBottom'>向下移入</button>",
                    nodeWrap = document.createElement("div");
                $(nodeWrap).append(nodel).append(noder).append(nodet).append(nodeb);
                $("#config-items").append(nodeWrap);
                nodeWrap.setAttribute("id", "transWrap");

                $("#transWrap").click(eventUtil.imgMov);
                break;
            }
            case 'mirror' : {
                $("#config").slideUp(200);
                $("#afterImg")[0].classList.add("mirror");
                break;
            }
            case 'transpos' : {
                $("#config").slideUp(200);
                $("#afterImg")[0].classList.add("transp");
                break;
            }
            case 'scale' : {
                var nodeInput = "<input id='scaleInput' type='text' placeholder='输入缩放比例'>",
                    node = "<button type='button' id='scaleBtn'>提交</button>";
                $("#config-items").append(nodeInput).append(node);

                $("#afterImg")[0].classList.add("scale");
                $("#scaleBtn").click(eventUtil.imgScale);
                break;
            }
            case 'rotate' : {
                var nodeInput = "<input id='rotateInput' type='text' placeholder='旋转角度'>",
                    node = "<button type='button' id='rotateBtn'>提交</button>";
                $("#config-items").append(nodeInput).append(node);

                $("#afterImg")[0].classList.add("rotate");
                $("#rotateBtn").click(eventUtil.imgRotate);
                break;
            }
        }
    });

    $("#grayChange").click(function (event) {
        var nodeId = event.target.id;
        //设置灰度图读取状态，只有均衡时改成1
        calUtils.state = 0;
        switch (nodeId) {
            //直接变灰度值
            case "gray" : {
                var preimg = document.getElementById("preImg"),
                    afterimg = document.getElementById("afterImg");
                $AI(preimg).ctx(calUtils.HDChange).replace(afterimg);
            }
            //阈值
            case "yuzhi": {
                var nodeInput = "<input id='yuzhiInput' type='text' placeholder='二值化阈值'>",
                    node = "<button type='button' id='yuzhiBtn'>提交</button>";
                $("#config-items").append(nodeInput).append(node);

                $("#yuzhiBtn").click(eventUtil.yuzhiChange);
                break;
            }
            //线性变换
            case "xianxing" : {
                var nodeInput = "<input id='xianxingx1' type='text' placeholder='第一个点x'>"
                    + "<input id='xianxingy1' type='text' placeholder='第一个点y'>"
                    + "<input id='xianxingx2' type='text' placeholder='第二个点x'>"
                    + "<input id='xianxingy2' type='text' placeholder='第二个点y'>";
                node = "<button type='button' id='xianxingBtn'>提交</button>";
                $("#config-items").append(nodeInput).append(node);

                $("#xianxingBtn").click(eventUtil.xianxingChange);
                break;
            }
            //拉伸变换
            case "lashen" : {
                var nodeInput = "<input id='xianxingx1' type='text' placeholder='第一个点x'>"
                    + "<input id='xianxingy1' type='text' placeholder='第一个点y'>"
                    + "<input id='xianxingx2' type='text' placeholder='第二个点x'>"
                    + "<input id='xianxingy2' type='text' placeholder='第二个点y'>";
                node = "<button type='button' id='lashenBtn'>提交</button>";
                $("#config-items").append(nodeInput).append(node);

                $("#lashenBtn").click(eventUtil.xianxingChange);
                break;
            }
            //非线性变换
            case "fxx" : {
                var nodeInput = "<input id='fxxInput' type='text'><br/>"
                                + "<div class='fxx'><input id='fxx1' type='radio' name='fxx' value='1'><label for='fxx1'>指数变换</label></div>"
                                + "<div class='fxx'><input id='fxx2' type='radio' name='fxx' value='2'><label for='fxx2'>对数变换</label></div>"
                                + "<div class='fxx'><input id='fxx3' type='radio' name='fxx' value='3'><label for='fxx3'>幂次变换</label></div>",
                node = "<button type='button' id='fxxBtn'>提交</button>";
                $("#config-items").append(nodeInput).append(node);

                $("#fxxBtn").click(eventUtil.fxx);
                break;
            }

            //均衡变换
            case "junheng" : {
                var preimg = document.getElementById("preImg"),
                    afterimg = document.getElementById("afterImg");

                $AI(preimg).ctx(calUtils.JHChange).replace(afterimg);
                break;
            }
        }
        //直方图部分
        var zftBtn = "<div id='zftBtn'>灰度直方图</div>",
            zft = "<div id='zftWrap'><div id='zft'></div></div>";
        $("#config-items").append(zftBtn);
        $("body").append(zft);
        $("#zftBtn").click(eventUtil.zft);
        
        //下载图片部分
        var download = "<div id='download'>下载图片</div>";
        $("#config-items").append(download);
        $("#download").click(eventUtil.download);
    });

    $("#smoothChange").click(function(event){
        var method = event.target.id;
        switch (method) {
            case 'gsSmooth' : {
                var nodeInput = "<input id='gsSmooth' type='text' placeholder='高斯平滑值'>",
                    node = "<button type='button' id='gsBtn'>提交</button>";
                $("#config-items").append(nodeInput).append(node);

                $("#gsBtn").click(eventUtil.gsSmooth);
                break;
            }
            case 'simSmooth' : {
                var preimg = document.getElementById("preImg"),
                    afterimg = document.getElementById("afterImg");

                $AI(preimg).ctx(calUtils.HDChange).ctx(calUtils.simSmooth).replace(afterimg);
                break;
            }
            case 'midSmooth' : {
                var preimg = document.getElementById("preImg"),
                    afterimg = document.getElementById("afterImg");

                $AI(preimg).ctx(calUtils.HDChange).ctx(calUtils.midSmooth).replace(afterimg);
                break;
            }
        }
    });


    $("#sharpChange").click(function(event) {
        var method = event.target.id;
        switch (method) {
            case 'marge': {
                var nodeInput = "<input id='margeNum' type='text' placeholder='常规锐化大小'>",
                    node = "<button type='button' id='margeNumbtn'>提交</button>";
                $("#config-items").append(nodeInput).append(node);

                $("#margeNumbtn").click(eventUtil.marge);
                break;
            }

            case "laplace": {
                $AI(preImg).ctx(calUtils.HDChange).ctx(calUtils.laplace).replace(afterImg);
                break;
            }

            case "gsLaplace": {
                $AI(preImg).ctx(calUtils.HDChange).ctx(calUtils.gsLaplace).replace(afterImg);
                break;
            }

            case "sobel": {
                var node1 = "<button type='button' id='sobelNomal'>正常边缘检测</button>",
                    node2 = "<button type='button' id='sobel45'>45/135度</button>";
                $("#config-items").append(node1).append(node2);

                $("#sobelNomal").click(function() {
                    $AI(preImg).ctx(calUtils.HDChange).ctx(function(){this.state = 1;}).ctx(calUtils.sobel).replace(afterImg);
                });
                $("#sobel45").click(function() {
                    $AI(preImg).ctx(calUtils.HDChange).ctx(function(){this.state = 2;}).ctx(calUtils.sobel).replace(afterImg);
                });
                break;
            }
        }
    });

    $("#featherGet").click(function(event) {
        var method = event.target.id;

        //轮廓处理阈值
        var threshNum = 170;
        switch (method) {
            case 'edgeLaplace': {
                $AI(preImg).ctx(calUtils.HDChange).ctx(calUtils.laplace).act("toThresh",7).ctx(function(){ this.back=255; }).ctx(calUtils.midSmooth).ctx(calUtils.edgeLaplace).replace(afterImg);
                break;
            }

            case 'edgeGet': {
                $AI(preImg).ctx(calUtils.HDChange).act("toThresh", threshNum).ctx(function(){ this.back=255; }).ctx(calUtils.edgeGet).replace(afterImg);
                break;
            }

            case 'areaGet': {
                var node = "<div class='mainText' id='mainText'></div>";
                $("#config-items").append(node);
                $AI(preImg).ctx(calUtils.HDChange).act("toThresh", threshNum).ctx(function(){ this.back=255; }).ctx(calUtils.imagePxGet).ctx(function() {
                    var text = document.getElementById("mainText");
                    text.textContent = "面积：" + this.num;
                }).replace(afterImg);
                break;
            }

            case 'girthGet': {
                var node = "<div class='mainText' id='mainText'></div>";
                $("#config-items").append(node);
                $AI(preImg).ctx(calUtils.HDChange).act("toThresh", threshNum).ctx(function(){ this.back=255; }).ctx(calUtils.edgeGet).ctx(calUtils.imagePxGet).ctx(function() {
                    var text = document.getElementById("mainText");
                    text.textContent = "周长：" + this.num;
                }).replace(afterImg);
                break;
            }
        }
    });

    $("#morphologyChange").click(function() {
        var method = event.target.id;

        //轮廓处理阈值
        var threshNum = 170;
        switch (method) {
            case 'corrode': {
                $AI(preImg).ctx(calUtils.HDChange).act("toThresh", threshNum).ctx(function(){ this.back=255; }).ctx(calUtils.imgCorrode).replace(afterImg);
                break;
            }

            case 'swell': {
                $AI(preImg).ctx(calUtils.HDChange).ctx(calUtils.laplace).act("toThresh",7).ctx(function(){ this.back=255; }).ctx(calUtils.midSmooth).ctx(calUtils.edgeLaplace).ctx(calUtils.imgSwell).ctx(calUtils.imgSwell).replace(afterImg);
                break;
            }

            case 'openCal': {
                $AI(preImg).ctx(calUtils.HDChange).act("toThresh", threshNum).ctx(function(){ this.back=255; }).ctx(calUtils.imgCorrode).ctx(calUtils.imgSwell).replace(afterImg);
                break;
            }

            case 'closeCal': {
                $AI(preImg).ctx(calUtils.HDChange).ctx(calUtils.laplace).act("toThresh",10).ctx(function(){ this.back=255; }).ctx(calUtils.midSmooth).ctx(calUtils.edgeLaplace).ctx(calUtils.imgSwell).ctx(calUtils.imgSwell).ctx(calUtils.imgCorrode).replace(afterImg);
                break;
            }

            case 'morphologyMake': {
                $AI(preImg).ctx(calUtils.HDChange).ctx(function(){ this.back=255; }).ctx(calUtils.laplace).act("toThresh",10).ctx(calUtils.midSmooth).ctx(calUtils.edgeLaplace).ctx(calUtils.imgSwell).ctx(calUtils.imgSwell).ctx(calUtils.imgCorrode).replace(afterImg);
                break;
            }

            case 'refine': {
                $AI(preImg).ctx(calUtils.HDChange).act("toThresh", threshNum).ctx(function(){ this.back=255; }).ctx(calUtils.imgRefine).replace(afterImg);
                break;
            }
        }
    });


    //**********事件工具集**********
    var eventUtil = {
        // download: function(event) {
        //     var afterimg = document.getElementById("afterImg");
        //     var result = $AI(afterimg).ctx(function(){
        //         var canvas = this.canvas;
        //     });
        // },
        imgShow: function (event) {
            var files = event.target.files;
            var imgData = files[0];
            var imgcontent = $("<p></p>").text("文件名:" + imgData.name + "\n文件类型:" + imgData.type + "\n文件大小:" + imgData.size + "B");
            $("#preImg")[0].src = "./image/" + imgData.name;
            $("#afterImg")[0].src = "./image/" + imgData.name;
            $("#config-items").empty().append(imgcontent);
        },
        imgMov: function (event) {
            $("#afterImg")[0].classList = [];
            $("#afterImg")[0].style = "";
            switch (event.target.id) {
                case 'transLeft' :
                    $("#afterImg")[0].classList.add("imgRight");
                    $("#afterImg")[0].style.transform = "translate3d(-100%,0,0)";
                    break;
                case 'transRight' :
                    $("#afterImg")[0].classList.add("imgLeft");
                    //自适应宽度负值
                    $("#afterImg")[0].style.left = -$("#afterImg")[0].width + "px";
                    $("#afterImg")[0].style.transform = "translate3d(100%,0,0)";
                    break;
                case 'transTop' :
                    $("#afterImg")[0].classList.add("transTop");
                    break;
                case 'transBottom' :
                    $("#afterImg")[0].classList.add("transBottom");
                    break
            }
        },
        imgScale: function (event) {
            var key = $("#scaleInput")[0].value;
            $("#afterImg")[0].style.transform = "scale(" + key + ")";
        },
        imgRotate: function (event) {
            var key = $("#rotateInput")[0].value;
            $("#afterImg")[0].style.transform = "rotate(" + key + "deg)";
        },
        yuzhiChange: function (event) {
            var key = $("#yuzhiInput")[0].value,
                preimg = document.getElementById("preImg"),
                afterimg = document.getElementById("afterImg");
            $AI(preimg).ctx(calUtils.HDChange).act("toThresh", key).replace(afterimg);
        },
        //包含多段线性变换和单行线性变换
        //提供接口act
        xianxingChange: function (event) {
            var x1 = $("#xianxingx1")[0].value,
                y1 = $("#xianxingy1")[0].value,
                x2 = $("#xianxingx2")[0].value,
                y2 = $("#xianxingy2")[0].value,
                preimg = document.getElementById("preImg"),
                afterimg = document.getElementById("afterImg");
            if (event.target.id === "xianxingBtn") {
                console.log("线性变换");
                $AI(preimg).ctx(calUtils.HDChange).act("curve", [x1, x2], [y1, y2]).replace(afterimg);
            } else if (event.target.id === "lashenBtn") {
                console.log("拉伸变换");
                $AI(preimg).ctx(calUtils.HDChange).act("curve", [0, x1, x2, 255], [0, y1, y2, 255]).replace(afterimg);
            }
        },

        //非线性变换事件
        fxx: function(event) {
            var nodes = document.querySelectorAll("[name='fxx']");
            var change = document.querySelector("#fxxInput");
            var value;
            var preimg = document.getElementById("preImg"),
                afterimg = document.getElementById("afterImg");
            for(var i=0; i<nodes.length; i ++){
                if(nodes[i].checked){
                    value = nodes[i].value;
                }
            }
            calUtils.state = 0;
            switch (value) {
                //指数
                case '1' : {
                    calUtils.fun = function(num) {
                        return Math.pow(change.value, num);
                    };
                    break;
                }
                //对数
                case '2' : {
                    calUtils.fun = function(num) {
                        return Math.log(num);
                    };
                    break;
                }
                //幂次
                case '3' : {
                    calUtils.fun = function (num) {
                        return Math.pow(num, change.value);
                    };
                    break;
                }
            }
            $AI(preimg).ctx(calUtils.HDChange).replace(afterimg);
        },

        //直方图
        zft : function(event) {
            $("#zftWrap").show();
            $("#zft").click(function(){
                $("#zftWrap").hide();
            });
            calUtils.zftShow();
        },

        //高斯处理
        gsSmooth : function(){
            var value = $("#gsSmooth")[0].value;

            var result = $AI(preimg).act("toGray").act("gaussBlur",value).replace(afterimg);
            console.log(result);
        },

        //常规锐化
        marge: function() {
            var value = $("#margeNum")[0].value;

            $AI(preImg).act("toGray").act("sharp", value).replace(afterImg);
        },

    };


    //*******************计算工具集****************8
    var calUtils = {
        state : 0,
        data : [],
        HDChange: function() {
            var imageData = this.getImageData(0, 0, this.canvas.width, this.canvas.height),
                data = imageData.data;
            var len = data.length;
            for (var i = 0; i < len; i += 4) {
                var gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
                if(calUtils.fun) {
                    gray = calUtils.fun(gray);
                }
                data[i] = gray;
                data[i + 1] = gray;
                data[i + 2] = gray;
            }
            this.putImageData(imageData, 0, 0);
        },
        JHChange: function() {
                //记录每个灰度值的个数
            var numList = [],
                //记录灰度值旧值对应的新值
                imgMap = {},
                //记录上一级
                preRate = 0,
                imageData = this.getImageData(0, 0, this.canvas.width, this.canvas.height),
                data = imageData.data;
            var len = data.length;
            var nodeNum = len/4;

            for (var i = 0; i < len ; i += 4) {
                var gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = gray;
                data[i + 1] = gray;
                data[i + 2] = gray;
            }

            //记录各灰度值的个数
            for(var i = 0 ; i <= 255 ; i++) {
                numList[i] = 0;
            }
            for(var i = 0 ; i < len ; i += 4) {
                numList[data[i]]++;
            }
            //记录旧的灰度值对应的新的灰度值
            for(var i = 0 ; i < 255 ; i++) {
                var nowRate = numList[i]/nodeNum + preRate;
                imgMap[i] = nowRate * 255;
                preRate = nowRate;
            }

            for(var i = 0 ; i < len ; i += 4) {
                var temp = imgMap[data[i]];
                data[i] = temp;
                data[i+1] = temp;
                data[i+2] = temp;
            }
            this.putImageData(imageData, 0, 0);
        },
        zftShow : function () {
            var afterimg = document.getElementById("afterImg");
            var hdData = [];
            var numList = [];
            $AI(afterimg).ctx(function() {
                hdData = this.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
            });
            var len = hdData.length;

            for(var i = 0 ; i <= 255 ; i++) {
                numList[i] = 0;
            }
            for(var i = 0; i < len; i += 4) {
                var grayIndex = hdData[i];
                numList[grayIndex]++;
            }
            calUtils.tubiao(numList);
        },
        //柱状图
        tubiao : function(data) {
            var myChart = echarts.init(document.getElementById('zft'),'vintage');
            var xAxisData = [];
            var data = data;
            for (var i = 0; i < 255; i++) {
                xAxisData.push("灰度值" + i);
            }

            option = {
                title: {
                    text: '灰度直方图'
                },
                legend: {
                    data: 'bar',
                    align: 'left'
                },
                toolbox: {
                    // y: 'bottom',
                    feature: {
                        magicType: {
                            type: ['stack', 'tiled']
                        },
                        dataView: {},
                        saveAsImage: {
                            pixelRatio: 1
                        }
                    }
                },
                tooltip: {},
                xAxis: {
                    data: xAxisData,
                    silent: false,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                },
                series: {
                    name: 'bar',
                    type: 'bar',
                    data: data,
                    animationDelay: function (idx) {
                        return idx * 3;
                    }
                },
                animationEasing: 'elasticOut'
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },

        //****************************
        //得到坐标系中的某个像素点的灰度值
        //x，y 分别为x轴和y轴
        getPoint : function(imageData, width, x, y) {
            var index = y * width + x;
            var result = imageData[index * 4];
            return result;
        },

        //设置坐标系中某个像素点的灰度值
        setPoint : function(imageData, width, x, y, value) {
            var index = y * width + x;
            imageData[index * 4] = value;
            imageData[index * 4 + 1] = value;
            imageData[index * 4 + 2] = value;
            imageData[index * 4 + 3] = 255;
        },

        /**
         * 求卷积
         * @param pattern 卷积核，当前只支持3*3 ,对于高斯-laplace中的5*5算子还木有兼容
         * @param preData 原图像中对应的像素点序列
         */
        juanji : function(pattern, preData) {
            var sum = 0;
            var len = pattern.length;
            for(var i = 0 ; i < len ; i++) {
                sum += pattern[i] * preData[i];
            }

            return sum;
        },

        /**
         * 获取像素点及周围序列
         * @param imageData
         * @param width
         * @param num 矩阵为num*num
         * @returns {Array}
         */
        getAllList : function(imageData, width, x, y, num) {
            list = [];
            var cNum = (num - 1) / 2;
            for(var i = -cNum ; i <= cNum ; i++) {
                for(var j = -cNum ; j <= cNum ; j++) {
                    list.push(calUtils.getPoint(imageData, width, x + j, y + i));
                }
            }
            return list;
        },

        //模板2 均值平滑
        //   [ 1, 1, 1
        //     1, 0, 1
        //     1, 1, 1 ] * 1/8
        simSmooth : function() {
            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;


            for(var y = 1 ; y < height-1 ; y++) {
                for(var x = 1 ; x < width-1 ; x++) {
                    avg = (calUtils.getPoint(imageData, width, x-1, y-1)
                        + calUtils.getPoint(imageData, width, x, y-1)
                        + calUtils.getPoint(imageData, width, x+1, y-1)
                        + calUtils.getPoint(imageData, width, x-1, y)
                        + calUtils.getPoint(imageData, width, x+1, y)
                        + calUtils.getPoint(imageData, width, x-1, y+1)
                        + calUtils.getPoint(imageData, width, x, y+1)
                        + calUtils.getPoint(imageData, width, x+1, y+1))/8;
                    calUtils.setPoint(imageData, width, x, y, avg);
                }
            }

            this.putImageData(imageSrc, 0, 0);
        },

        //中值平滑
        midSmooth : function() {
            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;
            var coreData = new Uint8ClampedArray(imageData);


            for(var y = 1 ; y < height - 1 ; y++) {
                for(var x = 1 ; x < width-1 ; x++) {
                    var list = calUtils.getAllList(coreData, width, x, y, 3);
                    //降序排序
                    list.sort(function(a,b){
                        return b - a;
                    });
                    calUtils.setPoint(imageData, width, x, y, list[5]);
                }
            }

            this.putImageData(imageSrc, 0, 0);
        },

        /**
         * laplace
         * pattern 卷积核
         */
        laplace : function() {
            //更换pattern为卷积核
            var pattern = [0, -1, 0, -1, 4, -1, 0, -1, 0];
            // var pattern = [-1, -1, -1, -1, 8, -1, -1, -1, -1];
            // var pattern = [1, -2, 1, -2, 4, -2, 1, -2, 1];

            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;
            var coreData = new Uint8ClampedArray(imageData);

            for(var y = 1 ; y < height - 1 ; y++) {
                for(var x = 1 ; x < width - 1 ; x++) {
                    var list = calUtils.getAllList(coreData, width, x, y, 3);
                    var newNum = calUtils.juanji(pattern, list);
                    calUtils.setPoint(imageData, width, x, y, newNum);
                }
            }

            this.putImageData(imageSrc, 0, 0);
        },

        /**
         * sobel 算子
         */
        sobel : function() {
            var pattern1,pattern2;
            if(this.state === 1) {
                pattern1 = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
                pattern2 = [1, 0, -1, 2, 0, -2, 1, 0, -1];
            } else {
                //45/135度sobel
                pattern1 = [0, -1, -2, 1, 0, -1, 2, 1, 0];
                pattern2 = [2, 1, 0, 1, 0, -1, 0, -1, -2];
            }

            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data,
                coreData1 = new Uint8ClampedArray(imageData),
                coreData2 = new Uint8ClampedArray(imageData);


            for(var y = 1 ; y < height - 1 ; y++) {
                for(var x = 1 ; x < width - 1 ; x++) {
                    var list1 = calUtils.getAllList(coreData1, width, x, y, 3);
                    var list2 = calUtils.getAllList(coreData2, width, x, y, 3);
                    var newNum1 = calUtils.juanji(pattern1, list1);
                    var newNum2 = calUtils.juanji(pattern2, list2);
                    calUtils.setPoint(imageData, width, x, y, Math.max(newNum1, newNum2));
                }
            }

            this.putImageData(imageSrc, 0, 0);
        },

        gsLaplace : function() {
            var pattern = [-2, -4, -4, -4, -2,
                           -4,  0,  8,  0, -4,
                           -4,  8,  24, 8, -4,
                           -4,  0,  8,  0, -4,
                           -2, -4, -4, -4, -2];
            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;
            var coreData = new Uint8ClampedArray(imageData);

            for(var y = 2 ; y < height - 2 ; y++) {
                for(var x = 2 ; x < width - 2 ; x++) {
                    var list = calUtils.getAllList(coreData, width, x, y, 5);
                    var newNum = calUtils.juanji(pattern, list);
                    calUtils.setPoint(imageData, width, x, y, newNum);
                }
            }
            this.putImageData(imageSrc, 0, 0);
        },

        //边缘提取-拉普拉斯边缘化方法
        edgeLaplace : function() {
            //pc为当前主体的颜色，bc为背景色
            var pc = 255-this.back,
                bc = this.back;
            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;
            var coreData = new Uint8ClampedArray(imageData);

            for(var y = 0 ; y < height ; y++) {
                for(var x = 0 ; x < width ; x++) {
                    var curColor = calUtils.getPoint(coreData, width, x, y);
                    if(curColor != pc) {
                        calUtils.setPoint(imageData, width, x, y, pc);
                    } else {
                        calUtils.setPoint(imageData, width, x, y, bc);
                    }
                }
            }
            this.putImageData(imageSrc, 0, 0);
        },

        //边缘提取
        edgeGet: function() {
            //pc为当前主体的颜色，bc为背景色
            var pc = 255-this.back,
                bc = this.back;
            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;
            var coreData = new Uint8ClampedArray(imageData);
            var pattern = [
                1, 1, 1,
                1, 1, 1,
                1, 1, 1
            ];

            for(var y = 1 ; y < height - 1 ; y++) {
                for(var x = 1 ; x < width - 1 ; x++) {
                    var list = calUtils.getAllList(coreData, width, x, y, 3);
                    if(calUtils.juanji(list,pattern) == list[4]) {
                        calUtils.setPoint(imageData, width, x, y, bc);
                    }
                }
            }
            this.putImageData(imageSrc, 0, 0);
        },

        imagePxGet: function() {
            this.num = 0;
            //pc为当前主体的颜色，bc为背景色
            var pc = 255-this.back,
                bc = this.back;
            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;

            for(var y = 0 ; y < height ; y++) {
                for (var x = 0; x < width; x++) {
                    var curColor = calUtils.getPoint(imageData, width, x, y);
                    if (curColor === pc) {
                        this.num++;
                    }
                }
            }
        },

        //图像腐蚀
        imgCorrode: function() {
            //pc为当前主体的颜色，bc为背景色
            var pc = 255 - this.back,
                bc = this.back;
            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;
            var coreData = new Uint8ClampedArray(imageData);
            var pattern = [
                0, 1, 0,
                1, 1, 1,
                0, 1, 0
            ];

            for(var y = 1 ; y < height-1 ; y++) {
                for(var x = 1 ; x < width-1 ; x++) {
                    var curColor = calUtils.getPoint(coreData, width, x, y);
                    //先判断当前点是否是图像点
                    if(curColor == pc) {
                        var list = calUtils.getAllList(coreData, width, x, y, 3);
                        for(var index in pattern ) {
                            if(pattern[index] === 1){
                                if(list[index] != pc) {
                                    calUtils.setPoint(imageData, width, x, y, bc);
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            this.putImageData(imageSrc, 0, 0);
        },

        //图像膨胀
        imgSwell: function() {
            //pc为当前主体的颜色，bc为背景色
            var pc = 255-this.back,
                bc = this.back;
            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;
            var coreData = new Uint8ClampedArray(imageData);
            var pattern = [
                0, 1, 0,
                1, 1, 1,
                0, 1, 0
            ];

            for(var y = 1 ; y < height-1 ; y++) {
                for(var x = 1 ; x < width-1 ; x++) {
                    var list = calUtils.getAllList(coreData, width, x, y, 3);
                    for(var index in pattern ) {
                        if(pattern[index] === 1){
                            if(list[index] === pc) {
                                calUtils.setPoint(imageData, width, x, y, pc);
                                break;
                            }
                        }
                    }
                }
            }

            this.putImageData(imageSrc, 0, 0);
        },

        //检测序列按照0->1的次数
        zeroChange: function(list) {
            var num = 0,
                len = list.length,
                flag = list[0];
            for(var i = 1 ; i < len ; i++) {
                if(list[i] === 1 && flag === 0) {
                    num++;
                }
                flag = list[i];
            }
            return num;
        },

        //判断邻域黑点的个数
        getBCNum: function(list) {
            var sum = 0;
            for(var i = 0 ; i < list.length ;i++) {
                sum += list[i];
            }
            sum -= list[4];
            return sum;
        },

        /**
         * 提取二值化图的9宫格并修整为算法要求的序列
         * @param list 图像像素序列
         * @param pc 物体像素的值
         * @return 0->1的次数
         */
        refinementList: function(list) {
            var result = [];

            result[0] = list[1];
            result[1] = list[0];
            result[2] = list[3];
            result[3] = list[6];
            result[4] = list[7];
            result[5] = list[8];
            result[6] = list[5];
            result[7] = list[2];
            result[8] = list[1];
            return result;
        },

        //对像素点调整为0-1序列
        pixelNumList: function(list, pc) {
            var result = [];
            var len = list.length;

            for(var index = 0 ; index < len ; index++) {
                result[index] = list[index] == pc ? 1 : 0;
            }
            return result;
        },


        //细化操作
        imgRefine: function() {
            //判断是否需要重复细化 flag 为 0 时说明已经没有点被删除了
            var flag = 1;
            //pc为当前主体的颜色，bc为背景色
            var pc = 255 - this.back,
                bc = this.back;
            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;
            var coreData = new Uint8ClampedArray(imageData);

            while(flag === 1) {
                flag = 0;

                for(var y = height-2 ; y > 2  ; y--) {
                    for(var x = 2 ; x < width - 2 ; x++) {
                        var curColor = calUtils.getPoint(coreData, width, x, y);
                        var list = calUtils.getAllList(coreData, width, x, y, 3);
                        var numList = calUtils.pixelNumList(list, pc);
                        // var list1 = calUtils.getAllList(imageData, width, x, y-1, 3);
                        // var list2 = calUtils.getAllList(imageData, width, x-1, y, 3);
                        var refineList = calUtils.refinementList(numList);
                        // var refineList1 = calUtils.refinementList(list1, pc);
                        // var refineList2 = calUtils.refinementList(list2, pc);

                        if(curColor == pc) {
                            //4个判断条件
                            if(calUtils.getBCNum(numList) >= 2 && calUtils.getBCNum(numList) <= 6
                                && calUtils.zeroChange(refineList) == 1
                                && numList[1] * numList[3] * numList[5] == 0
                                && numList[1] * numList[3] * numList[7] == 0) {
                                calUtils.setPoint(imageData, width, x, y, bc);
                                flag = 1;
                            }
                        }
                    }
                }

                coreData = new Uint8ClampedArray(imageData);
            }

            this.putImageData(imageSrc, 0, 0);
        }
    }
});
