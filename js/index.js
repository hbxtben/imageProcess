$(function() {
    //控制面板上划
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
        }
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
        }
    }
});







