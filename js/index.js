$(function() {
    //控制面板上划

    //原图-preImg 操作后图-afterImg
    var preImg = document.getElementById("preImg");
    var afterImg = document.getElementById("afterImg");
    var imgName;

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

        //删除脸部的框框！！！！！！！
        $('.rect').remove();
        $('.arrow').remove();
        $('.name').remove();
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
            //腐蚀
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
                $AI(preImg).ctx(function(){ this.back=255; }).ctx(calUtils.HDChange).act("toThresh", threshNum).ctx(calUtils.imgRefine).replace(afterImg);
                break;
            }
        }
    });

    $("#faceGet").click(function(event) {
        var method = event.target.id;

        switch(method) {
            case 'faceTag': {
                var names = imgName.split('.')[0].split('-');
                console.log(names);

                var tracker = new tracking.ObjectTracker('face');

                tracking.track(afterImg, tracker);

                tracker.on('track', function(event) {
                    event.data.forEach(function(rect) {
                        plotRectangle(rect.x, rect.y, rect.width, rect.height);
                    });
                });

                var plotRectangle = function(x, y, w, h) {
                    var rect = document.createElement('div');
                    var arrow = document.createElement('div');
                    var input = document.createElement('input');

                    input.value = names.pop();

                    rect.onclick = function name() {
                        input.select();
                    };

                    arrow.classList.add('arrow');
                    rect.classList.add('rect');
                    input.classList.add('name');

                    rect.appendChild(input);
                    rect.appendChild(arrow);
                    document.getElementById('photo').appendChild(rect);

                    rect.style.width = w + 'px';
                    rect.style.height = h + 'px';
                    rect.style.left = (afterImg.offsetLeft + x) + 'px';
                    rect.style.top = (afterImg.offsetTop + y) + 'px';
                };
                break;
            }

            case 'faceEle': {
                var tracker = new tracking.ObjectTracker(['face','eye','mouth']);
                tracker.setStepSize(1.7);

                tracking.track('#afterImg', tracker);

                tracker.on('track', function(event) {
                    event.data.forEach(function(rect) {
                        plot(rect.x, rect.y, rect.width, rect.height);
                    });
                });

                var plot = function(x, y, w, h) {
                    var rect = document.createElement('div');
                    document.querySelector('.face-container').appendChild(rect);
                    rect.classList.add('rect');
                    rect.style.width = w + 'px';
                    rect.style.height = h + 'px';
                    rect.style.left = (afterImg.offsetLeft + x) + 'px';
                    rect.style.top = (afterImg.offsetTop + y) + 'px';
                };
                break;
            }

            case 'colorRect': {

                // var demoContainer = document.querySelector('.face-container');

                // //肤色颜色判定
                // tracking.ColorTracker.registerColor('faceYellow', function(r, g, b) {
                //     if(r > 95 && g > 40 && b > 20 && r-b > 15 && r-g > 15) {
                //         return true;
                //     } else if(r > 200 && g > 210 && b > 170 && r - b <= 15 && r > b && g > b) {
                //         return true;
                //     } else {
                //         return false;
                //     }
                // });

                // var tracker = new tracking.ColorTracker('faceYellow');
                // tracker.on('track', function(event) {
                //     event.data.forEach(function(rect) {
                //         //长宽的限制
                //         var scale = rect.height / rect.width;
                //         if(scale > 1 && scale < 2) {
                //             plot(rect.x, rect.y, rect.width, rect.height, '#FFFFFF');
                //         }
                //     });
                // });
                // tracking.track('#afterImg', tracker);
                // //标识方框
                // var plot = function(x, y, w, h, color) {
                //     var rect = document.createElement('div');
                //     document.querySelector('.face-container').appendChild(rect);
                //     rect.classList.add('rect');
                //     rect.style.border = '2px solid ' + color;
                //     rect.style.width = w + 'px';
                //     rect.style.height = h + 'px';
                //     rect.style.left = (afterImg.offsetLeft + x) + 'px';
                //     rect.style.top = (afterImg.offsetTop + y) + 'px';
                // };
                
                var rects = [];
                $AI(preImg).ctx(calUtils.faceColorGet).ctx(function(){ this.back=255; }).ctx(calUtils.imgCorrode).ctx(calUtils.imgCorrode).ctx(calUtils.imgCorrode).ctx(calUtils.imgCorrode).ctx(calUtils.imgSwell).ctx(calUtils.imgSwell).ctx(calUtils.connect).ctx(calUtils.getRects).ctx(function(){rects = this.rectsList;});
                $AI(preImg).ctx(function(){this.rects = rects;}).ctx(calUtils.addRects).replace(afterImg);                
                break;
            }

            case 'faceColor': {
                var rects = [];
                $AI(preImg).ctx(calUtils.faceColorGet).ctx(function(){ this.back=255; }).ctx(calUtils.imgCorrode).ctx(calUtils.imgCorrode).ctx(calUtils.imgCorrode).ctx(calUtils.imgCorrode).ctx(calUtils.imgSwell).ctx(calUtils.imgSwell).ctx(calUtils.connect).ctx(calUtils.makeRect).ctx(function(){rects = this.rectsList;}).replace(afterImg);
                // $AI(preImg).ctx(function(){this.rects = rects;}).ctx(calUtils.addRects).replace(afterImg);
                break;
            }

            case 'faceFeature' : {
                var width = afterImg.width;
                var height = afterImg.height;
                console.log(width, height);
                var canvas = document.getElementById('canvas');
                var context = canvas.getContext('2d');
                //特征点数量
                var fastThreshold = 12;
                var doFindFeatures = function() {
                    tracking.Fast.THRESHOLD = fastThreshold;
                    context.drawImage(afterImg, 0, 0, width, height);
                    var imageData = context.getImageData(0, 0, width, height);
                    var gray = tracking.Image.grayscale(imageData.data, width, height);
                    var corners = tracking.Fast.findCorners(gray, width, height);
                    for (var i = 0; i < corners.length; i += 2) {
                        context.fillStyle = '#f00';
                        context.fillRect(corners[i], corners[i + 1], 3, 3);
                    }
                };
                doFindFeatures();
                // var gui = new dat.GUI();
                // gui.add(window, 'fastThreshold', 0, 100).onChange(doFindFeatures);

                afterImg.src = canvas.toDataURL("image/png");
                break;
            }
        }
    });


    $("#RGBChange").click(function(event) {
        var method = event.target.id;

        switch (method) {
            case 'hsi': {
                var nodeInput1 = "<input id='rgb_input' type='text' placeholder='R/G/B'>",
                    nodeInput2 = "<input id='hsi_input' type='text' placeholder='H/S/I'><br/>",
                    node1 = "<button id='RGBToHIS' type='text'>rgb转换至his</button><br/>";
                    node2 = "<button id='HSIToRGB' type='text'>his转换至rgb</button>";
                $("#config-items").append(nodeInput1).append(nodeInput2).append(node1).append(node2);

                $("#RGBToHIS").click(eventUtil.toHSI);
                $("#HSIToRGB").click(eventUtil.HSIToRGB);
                break;
            }

            case 'yiq': {
                var nodeInput1 = "<input id='rgb_input' type='text' placeholder='R/G/B'>",
                    nodeInput2 = "<input id='yiq_input' type='text' placeholder='Y/I/Q'><br/>",
                    node1 = "<button id='RGBToYIQ' type='text'>rgb转换至yiq</button><br/>";
                    node2 = "<button id='YIQToRGB' type='text'>yiq转换至rgb</button>";
                $("#config-items").append(nodeInput1).append(nodeInput2).append(node1).append(node2);

                $("#RGBToYIQ").click(eventUtil.toYIQ);
                $("#YIQToRGB").click(eventUtil.YIQToRGB);
                break;
            }

            case 'yuv': {
                var nodeInput1 = "<input id='rgb_input' type='text' placeholder='R/G/B'>",
                    nodeInput2 = "<input id='yuv_input' type='text' placeholder='Y/U/V'><br/>",
                    node1 = "<button id='RGBToYUV' type='text'>rgb转换至yuv</button><br/>";
                    node2 = "<button id='YUVToRGB' type='text'>yuv转换至rgb</button>";
                $("#config-items").append(nodeInput1).append(nodeInput2).append(node1).append(node2);

                $("#RGBToYUV").click(eventUtil.toYUV);
                $("#YUVToRGB").click(eventUtil.YUVToRGB);
                break;
            }

            case 'cmy': {
                var nodeInput1 = "<input id='rgb_input' type='text' placeholder='R/G/B'>",
                    nodeInput2 = "<input id='cmy_input' type='text' placeholder='C/M/Y'><br/>",
                    node1 = "<button id='RGBToCMY' type='text'>rgb转换至cmy</button><br/>";
                    node2 = "<button id='CMYToRGB' type='text'>cmy转换至rgb</button>";
                $("#config-items").append(nodeInput1).append(nodeInput2).append(node1).append(node2);

                $("#RGBToCMY").click(eventUtil.toCMY);
                $("#CMYToRGB").click(eventUtil.CMYToRGB);
                break;
            }

            case 'ycbcr': {
                var nodeInput1 = "<input id='rgb_input' type='text' placeholder='R/G/B'>",
                    nodeInput2 = "<input id='ycbcr_input' type='text' placeholder='Y/Cb/Cr'><br/>",
                    node1 = "<button id='RGBToYCBCR' type='text'>rgb转换至ycbcr</button><br/>";
                node2 = "<button id='YCBCRToRGB' type='text'>ycbcr转换至rgb</button>";
                $("#config-items").append(nodeInput1).append(nodeInput2).append(node1).append(node2);

                $("#RGBToYCBCR").click(eventUtil.toYCBCR);
                $("#YCBCRToRGB").click(eventUtil.YCBCRToRGB);
                break;
            }

            case 'hsv': {
                var nodeInput1 = "<input id='rgb_input' type='text' placeholder='R/G/B'>",
                    nodeInput2 = "<input id='hsv_input' type='text' placeholder='H/S/V'><br/>",
                    node1 = "<button id='RGBToHSV' type='text'>rgb转换至hsv</button><br/>";
                $("#config-items").append(nodeInput1).append(nodeInput2).append(node1);

                $("#RGBToHSV").click(eventUtil.toHSV);
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
            //保存下照片名字
            imgName = imgData.name;
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



//颜色转换
        //RGB => HSI
        toHSI : function() {
            var pre = document.getElementById("rgb_input").value;
            var lastList = pre.split('/');
            lastList.forEach(function (value, index, arr) {
                arr[index] = Number(arr[index]);
            });
            var last = calUtils.toHSI(lastList[0],lastList[1],lastList[2]);
            document.getElementById("hsi_input").value = last.join('/');
        },

        //HSI => RGB
        HSIToRGB : function() {
            var pre = document.getElementById("hsi_input").value;
            var lastList = pre.split('/');
            lastList.forEach(function (value, index, arr) {
                arr[index] = Number(arr[index]);
            });

            var last = calUtils.HSIToRGB(lastList[0],lastList[1],lastList[2]);
            console.log(last);
            document.getElementById("rgb_input").value = last.join('/');
        },

        toYIQ : function() {
            var pre = document.getElementById("rgb_input").value;
            var lastList = pre.split('/');
            lastList.forEach(function (value, index, arr) {
                arr[index] = Number(arr[index]);
            });

            var last = calUtils.toYIQ(lastList[0],lastList[1],lastList[2]);
            document.getElementById("yiq_input").value = last.join('/');
        },

        YIQToRGB : function() {
            var pre = document.getElementById("yiq_input").value;
            var lastList = pre.split('/');
            lastList.forEach(function (value, index, arr) {
                arr[index] = Number(arr[index]);
            });

            var last = calUtils.YIQToRGB(lastList[0],lastList[1],lastList[2]);
            document.getElementById("rgb_input").value = last.join('/');
        },

        toYUV : function() {
            var pre = document.getElementById("rgb_input").value;
            var lastList = pre.split('/');
            lastList.forEach(function (value, index, arr) {
                arr[index] = Number(arr[index]);
            });

            var last = calUtils.toYUV(lastList[0],lastList[1],lastList[2]);
            document.getElementById("yuv_input").value = last.join('/');
        },

        YUVToRGB : function() {
            var pre = document.getElementById("yuv_input").value;
            var lastList = pre.split('/');
            lastList.forEach(function (value, index, arr) {
                arr[index] = Number(arr[index]);
            });

            var last = calUtils.YUVToRGB(lastList[0],lastList[1],lastList[2]);
            document.getElementById("rgb_input").value = last.join('/');
        },

        toCMY : function() {
            var pre = document.getElementById("rgb_input").value;
            var lastList = pre.split('/');
            lastList.forEach(function (value, index, arr) {
                arr[index] = Number(arr[index]);
            });

            var last = calUtils.toCMY(lastList[0],lastList[1],lastList[2]);
            document.getElementById("cmy_input").value = last.join('/');
        },

        CMYToRGB : function() {
            var pre = document.getElementById("cmy_input").value;
            var lastList = pre.split('/');
            lastList.forEach(function (value, index, arr) {
                arr[index] = Number(arr[index]);
            });

            var last = calUtils.CMYToRGB(lastList[0],lastList[1],lastList[2]);
            document.getElementById("rgb_input").value = last.join('/');
        },

        toYCBCR : function() {
            var pre = document.getElementById("rgb_input").value;
            var lastList = pre.split('/');
            lastList.forEach(function (value, index, arr) {
                arr[index] = Number(arr[index]);
            });

            var last = calUtils.toYCBCR(lastList[0],lastList[1],lastList[2]);
            document.getElementById("ycbcr_input").value = last.join('/');
        },

        YCBCRToRGB : function() {
            var pre = document.getElementById("ycbcr_input").value;
            var lastList = pre.split('/');
            lastList.forEach(function (value, index, arr) {
                arr[index] = Number(arr[index]);
            });

            var last = calUtils.YCBCRToRGB(lastList[0],lastList[1],lastList[2]);
            document.getElementById("rgb_input").value = last.join('/');
        },

        toHSV : function() {
            var pre = document.getElementById("rgb_input").value;
            var lastList = pre.split('/');
            lastList.forEach(function (value, index, arr) {
                arr[index] = Number(arr[index]);
            });

            var last = calUtils.toHSV(lastList[0],lastList[1],lastList[2]);
            document.getElementById("hsv_input").value = last.join('/');
        }
    };

















    //*******************计算工具集****************
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

        getIndex : function(width, x, y) {
            var index = (y * width + x) * 4;
            return index;
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

                for(var y = 2 ; y < height - 2  ; y++) {
                    for(var x = 2 ; x < width - 2 ; x++) {
                        var curColor = calUtils.getPoint(coreData, width, x, y);
                        var list = calUtils.getAllList(coreData, width, x, y, 3);
                        var numList = calUtils.pixelNumList(list, pc);
                        //书上算法
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
        },

        //colorMatrix
        matrixMulti : function(middle, pre) {
            len = middle.length;
            result = [];
            for(var i = 0 ; i < len ; i += 3) {
                result[i / 3] = middle[i] * pre[0] + middle[i + 1] * pre[1] + middle[i + 2] * pre[2];
                result[i / 3] = result[i / 3].toFixed(3);
            }
            return result;
        },

        //RGB => HSI
        toHSI : function(r, g, b) {
            var i = (r + g + b) / 3;
            var f = (2 * r - g - b) / (g - b);
            var temp = g > b ? 0 : 180;
            var h = (1/360)*(90-Math.atan(f/Math.sqrt(3))+temp);
            var s = 1 - (Math.min(r, g, b)/i);
            // return [h.toFixed(3), s.toFixed(3), i.toFixed(3)];
            return [h, s, i];
        },

        //HSI => RGB
        HSIToRGB : function(h, s, i) {
            var r, g, b;
            if(h < 120 && h >= 0) {
                r = (i / Math.sqrt(3)) * (1 + (s * Math.cos(h) / Math.cos(60-h)));
                b = (i / Math.sqrt(3)) * (1 - s);
                g = Math.sqrt(3) * i - r - b;
            }else if(h<240 && h >=120) {
                g = (i / Math.sqrt(3)) * (1 + (s * Math.cos(h-120) / Math.cos(180-h)));
                r = (i / Math.sqrt(3)) * (1 - s);
                b = Math.sqrt(3) * i - r - g;
            } else if(h>=240 && h<360){
                b = (i / Math.sqrt(3)) * (1 + (s * Math.cos(h-240) / Math.cos(300-h)));
                g = (i / Math.sqrt(3)) * (1 - s);
                r= Math.sqrt(3) * i - g - b;
            }
            // return [r.toFixed(3), g.toFixed(3), b.toFixed(3)];
            return [r, g, b];
        },

        //RGB => YIQ
        toYIQ : function(r, g, b) {
            var pattern = [
                0.299, 0.587, 0.114,
                0.596, -0.274, -0.322,
                0.211, -0.522, 0.311
            ];
            console.log(calUtils.matrixMulti(pattern, [r, g, b]));
            return calUtils.matrixMulti(pattern, [r, g, b]);
        },

        //YIQ => RGB
        YIQToRGB : function(y, i, q) {
            var pattern = [
                1, 0.956, 0.623,
                1, -0.272, -0.648,
                1, -1.105, -0.705
            ];
            return calUtils.matrixMulti(pattern, [y, i, q]);
        },

        //RGB => YUV
        toYUV : function(r, g, b) {
            var pattern = [
                0.299, 0.587, 0.114,
                -0.1678, -0.3313, 0.5,
                0.5, -0.4187, -0.0813
            ];
            return calUtils.matrixMulti(pattern, [r, g, b]);
        },

        //YUV => RGB
        YUVToRGB : function(y, u, v) {
            var pattern = [
                1,        0,    1.402,
                1, -0.34414, -0.71414,
                1,   1.1772,        0
            ];
            return calUtils.matrixMulti(pattern, [y, u, v]);
        },

        //RGB => CMY
        toCMY : function(r, g, b) {
            var c = 1 - r;
            var m = 1 - g;
            var y = 1 - b;
            return [c, m, y];
        },

        //CMY => RGB
        CMYToRGB : function(c, m, y) {
            var r = 1 - c;
            var g = 1 - m;
            var b = 1 - y;
            return [r, g, b];
        },

        //RGB => YCbCr
        toYCBCR : function(r, g, b) {
            var y = 0.299 * r + 0.587 * g + 0.114 * b;
            var cb = -0.1687 * r - 0.3313 * g + 0.5 * b + 128;
            var cr = 0.5 * r - 0.4187 * g - 0.0813 * b + 128;

            return [y.toFixed(3), cb.toFixed(3), cr.toFixed(3)];
        },

        //YCbCr => RGB
        YCBCRToRGB : function(y, cb, cr) {
            var r = y + 1.402 * (cr - 128);
            var g = y - 0.34414 * (cb - 128) - 0.71414 * (cr - 128);
            var b = y + 1.772 * (cb - 128);
            return [r.toFixed(3), g.toFixed(3), b.toFixed(3)];
        },

        //RGB => HSV
        toHSV : function(r, g, b) {
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var h, s, v;

            if(r == max) {
                h = (g - b) / (max - min);
            } else if (g == max) {
                h = 2 + (b - r) / (max - min);
            } else if (b == max) {
                h = 4 + (r - g) / (max - min);
            }

            h = h * 60;
            if(h < 0) {
                h = h +360;
            }

            v = max/255;
            s = (max - min) / max;

            return [h.toFixed(3), s.toFixed(3), v.toFixed(3)];
        },

        faceColorGet : function() {
            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;

            for(var y = 0 ; y < height ; y++) {
                for(var x = 0 ; x < width ; x++) {
                    var pixIndex = calUtils.getIndex(width, x, y);
                    var r = imageData[pixIndex],
                        g = imageData[pixIndex + 1],
                        b = imageData[pixIndex + 2];
                    if(r > 95 && g > 40 && b > 20 && r-b > 15 && r-g > 15) {
                        calUtils.setPoint(imageData, width, x, y, 0);
                    } else if(r > 200 && g > 210 && b > 170 && r - b <= 15 && r > b && g > b) {
                        calUtils.setPoint(imageData, width, x, y, 0);
                    } else {
                        calUtils.setPoint(imageData, width, x, y, 255);
                    }
                }
            }

            this.putImageData(imageSrc, 0, 0);
        },

        // 连通性检测
        connect : function() {
            //pc为当前主体的颜色，bc为背景色
            var pc = 255-this.back,
                bc = this.back;
            var width = this.canvas.width,
                height = this.canvas.height;
            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;

            var tagMap = {};
            var mapAdd = function(tagMap, key, value) {
                if(tagMap[key]) {
                    tagMap[key].push(value);
                } else {
                    tagMap[key] = [value];
                }
            };


            var tagList = [];
            for(var x = 0 ; x < width ; x++) {
                tagList[x] = [];
                for(var y = 0 ; y < height  ; y++) {
                    
                    var curColor = calUtils.getPoint(imageData, width, x, y);
                    if(curColor == pc) {
                        tagList[x][y] = 1;
                    } else {
                        tagList[x][y] = 0;
                    }
                }
            }

            var nowTag = 1;
            for(var x = 1 ; x < width-1 ; x++) {
                for(var y = 1 ; y < height-1 ; y++) {
                    if(tagList[x][y] == 0) {
                        continue;
                    } else if (tagList[x][y-1] > 0 && (tagList[x-1][y] == tagList[x][y-1] || tagList[x-1][y] == 0)) {
                        tagList[x][y] = tagList[x][y-1];
                        //将坐标 y，x添加到hash表中
                        mapAdd(tagMap, tagList[x][y], [x,y]);
                    } else if(tagList[x-1][y]>0 && tagList[x][y-1]==0) {
                        tagList[x][y] = tagList[x-1][y];
                        mapAdd(tagMap, tagList[x][y], [x,y]);
                    } else if(tagList[x][y-1]!=tagList[x-1][y] && tagList[x][y-1]>0 && tagList[x-1][y]>0) {
                        var temp = tagList[x-1][y];
                        tagMap[tagList[x][y-1]] = tagMap[tagList[x][y-1]].concat(tagMap[tagList[x-1][y]]);
                        delete tagMap[tagList[x-1][y]];
                        for( i = 0 ; i < width ; i++) {
                            for(j = 0 ; j < height ; j++) {
                                if(tagList[i][j] == temp) {
                                    tagList[i][j] = tagList[x][y-1];
                                }
                            }
                        }

                        tagList[x][y] = tagList[x][y-1];
                        mapAdd(tagMap, tagList[x][y], [x,y]);

                    } else {
                        nowTag += 1;
                        tagList[x][y] = nowTag;
                        mapAdd(tagMap, nowTag, [x, y]);
                    }
                }
            }
            for(var i in tagMap) {
                if(tagMap[i].length < 300) {
                    delete tagMap[i];
                }
            }
            this.tagMap = tagMap;
        },

        makeRect : function() {
            var width = this.canvas.width,
                height = this.canvas.height;
            
            var ctx = this.canvas.getContext('2d');
            ctx.strokeStyle = 'red';
            for(var item in this.tagMap) {
                var minx = maxx = this.tagMap[item][0][0],
                    miny = maxy = this.tagMap[item][0][1];
                for(var index in this.tagMap[item]) {
                    var nowX = this.tagMap[item][index][0];
                    var nowY = this.tagMap[item][index][1];
                    minx = nowX < minx ? nowX : minx;
                    miny = nowY < miny ? nowY : miny;
                    maxx = nowX > maxx ? nowX : maxx;
                    maxy = nowY > maxy ? nowY : maxy;
                }
                console.log( "min("+minx,miny+")","width:"+(maxx-minx),"height:"+(maxy-miny));
                ctx.strokeRect(minx, miny, maxx-minx, maxy-miny);
            }

            var imageSrc = this.getImageData(0, 0, width, height),
                imageData = imageSrc.data;
            var colors  = [[255,0,0],[255,255,0], [0,255,0]];
            var i = 0;
            for(var item in this.tagMap) {
                for(var listItem in this.tagMap[item]){
                    calUtils.setPoint(imageData, width, this.tagMap[item][listItem][0], this.tagMap[item][listItem][1], 170);
                    var index = calUtils.getIndex(width, this.tagMap[item][listItem][0], this.tagMap[item][listItem][1]);
                    imageData[index] = colors[i][0];    
                    imageData[index+1] = colors[i][1];    
                    imageData[index+2] = colors[i][2];    
                }
                i++;
            }

            this.putImageData(imageSrc, 0, 0);
        },
        
        getRects : function() {
            var width = this.canvas.width,
                height = this.canvas.height;
            this.rectsList = [];
            for(var item in this.tagMap) {
                var minx = maxx = this.tagMap[item][0][0],
                    miny = maxy = this.tagMap[item][0][1];
                for(var index in this.tagMap[item]) {
                    var nowX = this.tagMap[item][index][0];
                    var nowY = this.tagMap[item][index][1];
                    minx = nowX < minx ? nowX : minx;
                    miny = nowY < miny ? nowY : miny;
                    maxx = nowX > maxx ? nowX : maxx;
                    maxy = nowY > maxy ? nowY : maxy;
                }
                console.log( "min("+minx,miny+")","width:"+(maxx-minx),"height:"+(maxy-miny));
                var rect = [minx,miny,maxx-minx,maxy-miny];
                this.rectsList.push(rect);
            }
        },

        addRects : function() {
            var width = this.canvas.width,
                height = this.canvas.height;
            
            
            var ctx = this.canvas.getContext('2d');
            ctx.strokeStyle = 'red';
            for(var i in this.rects){
                // console.log(this.rects[i]);
                if(this.rects[i][3] / this.rects[i][2] > 1 && this.rects[i][3] / this.rects[i][2] < 3) {

                    ctx.strokeRect(this.rects[i][0], this.rects[i][1], this.rects[i][2], this.rects[i][3])
                }
            }
        }
    }
});
