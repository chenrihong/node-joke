/*shadowee@qq.com*/
;
var mainfn;

$(function () {
    "use strict";
    function main() {
        this.loadingbar();
        this.level = {
            lvl_default: "default",
            lvl_primary: "primary",
            lvl_success: "success",
            lvl_info: "info",
            lvl_warning: "warning",
            lvl_danger: "danger"
        };
    }

    main.prototype.loadingbar = function () {
        var modal_window = '<div class="modal" id="loadingbar"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
                              <div class="modal-dialog">\
                                <div class="modal-content">\
                                  <div class="modal-body">\
                                    <div id="loadingbar_progress" class="progress progress-striped">\
                                      <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">\
                                      </div>\
                                    </div>\
                                  </div>\
                                </div>\
                              </div>\
                            </div>';

        $("#loadingbar").size() != 0 && $("#loadingbar").remove();

        $(document.body).append($(modal_window).hide());
        var $progress = $("#loadingbar_progress").children("div:first");
        var has_erros_occur = false;
        $(document).ajaxStart(function () {
            if (has_erros_occur) {
                $("#loadingbar").remove();
                $(document.body).append($(modal_window).hide());
                $progress = $("#loadingbar_progress").children("div:first");
                has_erros_occur = false;
            }
            $progress.attr("aria-valuenow", 0).css("width", "0%").text("");
            $("#loadingbar").modal('show');

        }).ajaxSend(function (e, xhr, settings) {
            $progress.attr("aria-valuenow", 25).css("width", "25%");

        }).ajaxSuccess(function () {
            $progress.attr("aria-valuenow", 50).css("width", "50%");


        }).ajaxComplete(function () {
            $progress.attr("aria-valuenow", 75).css("width", "75%");

        }).ajaxStop(function () {
            $progress.attr("aria-valuenow", 100).css("width", "100%");

            if (!has_erros_occur) {
                setTimeout(function () {
                    $("#loadingbar").modal('hide');
                }, 300);
            }

        }).ajaxError(function (event, xhr, options, exc) {

            $progress.attr("aria-valuenow", 100).css("width", "100%"); /*fix ie*/

            has_erros_occur = true;
            $progress.text("发生错误：代码：" + xhr.status + " , 地址：" + options.url);

            if (xhr.status == "506") {

            }
            else if (xhr.status == "404") {

            }
            else if (xhr.status == "503" || xhr.status == "505") {

            }
            else if (xhr.status == "504" || xhr.status == "12031") {

                var json = eval("(" + xhr.responseText + ")");

                showerrortext(json.data);
                console.clear();
                console.error(json.data);
            }
            else if (xhr.status != "-2147467260" && xhr.status != "200") {

                showerrortext(xhr.responseText);
                console.clear();
                console.info(xhr.responseText);
            }

            function showerrortext(errtext) {
                $("#loadingbar_progress").height(400).css("overflow", "auto");
                $progress.height(21);
                $("#loadingbar_progress").append("<div style='margin-top:21px;'>" + errtext + "</div>");
            }
        });
    };

    main.prototype.dialog = function (title, body, callback, btntext) {
        $("#crh-modal").size() && $("#crh-modal").remove();

        var modal = '<div class="modal fade" id="crh-modal" tabindex="-1" role="dialog" aria-labelledby="crh-modal" aria-hidden="true">\
            <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-header">\
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                <h4 class="modal-title" id="crh-modal-title">{0}</h4>\
                </div>\
                <div class="modal-body" id="crh-modal-body">{1}</div>\
                <div class="modal-footer">\
                <button type="button" class="btn btn-primary" id="crh-modal-btn" onclick="{2}">{3}</button>\
                 <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\
                </div>\
            </div>\
            </div>\
        </div>';
        $(document.body).append(modal);

        var $modal = $("#crh-modal");
        $("#crh-modal-title").html(title);
        $("#crh-modal-body").html(body);
        $("#crh-modal-btn").unbind("click").bind("click", function () {
            if (callback) {
                var x = callback();
                if (x == undefined) {
                    x = true;
                }
                x && $modal.modal('hide');
            }
        }).text(btntext ? btntext : "保存");
        $modal.modal('show');
    };

    main.prototype.label = function (label, text) {
        return "".format(label, text);
    };

    main.prototype.checkForm = function ($form) {
        var nm = 0;
        $form.find(".notnull").each(function (idx, obj) {
            if (obj.tagName.toLowerCase() == "input" || obj.tagName.toLowerCase() == "select") {
                if (obj.value === "") {
                    var $obj = $(obj);
                    $obj.tooltip({ title: "本项为必填项，请输入值", placement: "auto" });
                    $obj.tooltip('show');
                    obj.style.borderColor = "red";
                    obj.focus();
                    obj.scrollIntoView();

                    setTimeout(function () {
                        $(obj).tooltip('destroy');
                        obj.style.borderColor = "";
                    }, 4000);

                    nm++;
                    return false;
                }
            }
        });

        return nm > 0;
    };
    main.prototype.loadForm = function ($form, data) {

        $form.find("input").each(function (i, obj) {
            obj.value = (data[obj.name] == null) ? "" : data[obj.name];
        });

        $form.find("select").each(function (i, obj) {
            $(obj).find("option").each(function (j, opt) {
                if (opt.innerText == data[obj.name]) {
                    obj.value = opt.getAttribute("value");
                    return false; /*break*/
                }
            });
        });

        $form.find("textarea").each(function (i, obj) {
            obj.innerText = (data[obj.name]==null) ? "" : data[obj.name];
        });
    };

    main.prototype.msg = function (msg) {
        if ($("#crh-msg").size() == 0) {
            var msgdiv = "<div id=\"crh-msg\" style='cursor:pointer;position:fixed;bottom:0;right:0;width:300px;height:150px;display:none;z-index:9999;background-color:green;color:white;' class=\"alert alert-dismissable \">" +
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button><strong>提示：</strong>" +
                "<p>&nbsp;</p><p id=\"crh-msg-content\">" + msg + "</p></div>";
            $(document.body).append(msgdiv);
        } else {
            $("#crh-msg-content").html(msg);
        }
        var $msg = $("#crh-msg");
        $msg.slideDown(800, function () {
            function _fn() {
                var interv = setTimeout(function () {
                    $msg.slideUp(800, function () {
                        $msg.hide();
                    });
                }, 3000);
                return interv;
            }
            var interval = _fn();
            $msg.bind("mouseover", function () {
                clearInterval(interval);
                $msg.slideDown(800, function () { });
            });
            $msg.bind("mouseout", function () {
                interval = _fn();
            });
        });
    };

    main.prototype.setReadonly = function (element_id) {
        var obj = document.getElementById(element_id);
        obj.setAttribute("readonly", "readonly");
        !$(obj).hasClass("input-readonly") && $(obj).addClass("input-readonly");
    };
    main.prototype.removeReadonly = function (element_id) {
        var obj = document.getElementById(element_id);
        obj.removeAttribute("readonly", "readonly");
        $(obj).hasClass("input-readonly") && $(obj).removeClass("input-readonly");
    };

    main.prototype.setNotnull = function (element_id) {
        var obj = document.getElementById(element_id);
        obj.classList.add("notnull");
        !$(obj).hasClass("notnull") && $(obj).addClass("notnull");
        $(obj).bind("blur", function () {
            if (!obj.value) {
                mainfn.msg("该控件值不允许为空，请输入值");
                obj.focus();
            }
        });
    };
    main.prototype.removeNotnull = function (element_id) {
        var obj = document.getElementById(element_id);
        $(obj).hasClass("notnull") && $(obj).removeClass("notnull");
        $(obj).unbind("blur");
    };

    main.prototype.window = function (url, options) {

        if (arguments.length == 1) {

            var obj = null;
            $("div[id^='crh-win-']").each(function (i, div) {
                if (i == 0 || div.style.zIndex > obj.style.zIndex) { obj = div; }
            });

            if (typeof arguments[0] == "string") {
                if (arguments[0] == "close") {
                    $(obj).remove();
                    if ($("#crh-win-modal-div").size() > 0) {
                        $("#crh-win-modal-div").remove();
                    }
                } else if (arguments[0] == "getwin") {
                    return window.frames[$(obj).find("iframe").attr("name")];
                }
            }
            return;
        }


        var defaults = {
            width: 550,
            height: 400,
            modal: true,
            title: "新窗体",
            level: this.level.lvl_default,
            buttons: [],
            onclose: null

        };

        var winsize = $("div[id^='crh-win-']").size();

        var winid = "crh-win-" + new Date().getTime();
        var zindex = 120 + winsize * 1;
        var opts = $.extend(defaults, options);

        var left = Math.abs(document.documentElement.clientWidth - opts.width) / 2;
        var top = Math.abs(document.documentElement.clientHeight - opts.height) / 2 - 20;

        if (winsize != 0) {
            left += winsize * 20;
            top += winsize * 20;
        }

        var rDrag = {

            o: null,

            init: function (o) {
                o.onmousedown = this.start;
            },

            start: function (e) {
                var o;
                e = rDrag.fixEvent(e);
                e.preventDefault && e.preventDefault();
                rDrag.o = o = document.getElementById(winid);
                o.x = e.clientX - rDrag.o.offsetLeft;
                o.y = e.clientY - rDrag.o.offsetTop;
                document.onmousemove = rDrag.move;
                document.onmouseup = rDrag.end;
            },

            move: function (e) {

                e = rDrag.fixEvent(e);
                var oLeft, oTop;
                oLeft = e.clientX - rDrag.o.x;
                oTop = e.clientY - rDrag.o.y;

                oLeft = oLeft < 0 ? 0 : oLeft;
                oTop = oTop < 0 ? 0 : oTop;

                /*if (oLeft > document.documentElement.clientWidth - opts.width) {
                oLeft = document.documentElement.clientWidth - opts.width;
                }
                if (oTop > document.documentElement.clientHeight - opts.height) {
                oTop = document.documentElement.clientHeight - opts.height;
                }*/

                rDrag.o.style.left = oLeft + 'px';
                rDrag.o.style.top = oTop + 'px';
            },

            end: function (e) {
                e = rDrag.fixEvent(e);
                rDrag.o = document.onmousemove = document.onmouseup = null;
            },

            fixEvent: function (e) {
                if (!e) {
                    e = window.event;
                    e.target = e.srcElement;
                    e.layerX = e.offsetX;
                    e.layerY = e.offsetY;
                }
                return e;
            }
        };

        var iframeHeight = opts.height - 38;
        if (opts.buttons && opts.buttons.length) {
            iframeHeight -= 54;
        }


        var html = '<div id="' + winid + '" class="panel panel-' + opts.level + ' crh-window" style="width:' + opts.width + 'px; height: ' + opts.height + 'px; position: absolute; left: ' + left + 'px; top: ' + top + 'px; z-index: ' + zindex + ';">\
        <div class="panel-heading" style="cursor: move;">\
            ' + opts.title + '<span class="pull-right close" style="cursor: pointer;">&times;</span>\
        </div>\
        <div class="panel-body" style="padding-top:15px;padding-bottom:0px;padding-left:0;">\
           <iframe frameborder="0" name="iframe-' + winid + '" style="border:0; margin-top: -15px;margin-bottom: -3px;padding:0;width: ' + (opts.width - 3) + 'px; height: ' + (iframeHeight - 3) + 'px;" src="' + url + '"></iframe>\
        </div>\
    </div>';

        if (opts.modal) {
            html += "<div id='crh-win-modal-div' style='position: fixed;z-index: 119;top: 0px;left: 0px;height: 100%;width: 100%;background: #000;filter:alpha(opacity=50);-moz-opacity:0.5;opacity:0.5;'></div>";
        }

        $(document.body).append(html);

        if (opts.buttons && opts.buttons.length > 0) {
            var btnhtml = '<button type="button" class="btn btn-{2} btn-sm" id="{0}">{1}</button>';
            var btns = '<div class="panel-footer" style="background-color:white;">';
            var btnids = ",";
            for (var b = opts.buttons.length - 1; b > -1; b--) {
                var btn = opts.buttons[b];

                if (!btn.id) {
                    btn.id = "crh-win-btns-btn-" + b;
                }
                if (btnids.indexOf(btn.id) != -1) {
                    btn.id = "crh-win-btns-btn-" + b;
                }
                btnids += btn.id + ",";

                if (!btn.level) {
                    btn.level = mainfn.level.lvl_default;
                }

                btns += '<div style="float:right;margin-right:10px;">';
                btns += "".format(btnhtml, btn.id, btn.text, btn.level);
                btns += '</div>';
                opts.buttons[b].id = btn.id;
            }
            btns += '</div>';

            $("#" + winid + "").append(btns);

            for (b = opts.buttons.length - 1; b > -1; b--) {
                btn = opts.buttons[b];
                if (typeof btn.handler == 'function') {
                    $("#" + btn.id).bind("click", btn.handler);
                }
            }
        }

        rDrag.init($("#" + winid + " .panel-heading").get(0));

        $("div[id^='crh-win-']").each(function (idx, obj) {
            if (obj.id != winid) {
                obj.style.zIndex = obj.style.zIndex - 1;
            } else {
                obj.style.zIndex = 120 + $("div[id^=crh-win-]").size();
            }
        });

        $("#" + winid + " .close").click(function () {
            $("#" + winid).remove();
            if (opts.modal) {
                if (typeof opts.onclose == "function") {
                    opts.onclose();
                }
                $("#crh-win-modal-div").remove();
            }
        });
    };

    main.prototype.bootdate = function (selector, options) {
        /*
        http://www.bootcss.com/p/bootstrap-datetimepicker/index.htm
        0 or 'hour' for the hour view
        1 or 'day' for the day view
        2 or 'month' for month view (the default)
        3 or 'year' for the 12-month overview
        4 or 'decade' for the 10-year overview. Useful for date-of-birth datetimepickers.
        */
        var defaults = {
            keyboardNavigation: 1,
            weekStart: 0,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: '2',
            minView: 0,
            maxView: 4,
            forceParse: 1,
            minuteStep: 5,
            pickerPosition: 'bottom-right',
            showMeridian: 0,
            initialDate: new Date()
        };

        var opt = $.extend(defaults, options);

        if ($(selector).size() != 0) {
            $(selector).datetimepicker(opt);
        } else {
            mainfn.msg(selector + "无匹配元素");
        }
    };



    mainfn = new main();
});


//扩展js关键字方法

String.prototype.format = function () {
    if (arguments.length == 0) return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

//格式化json日期 /Date(1392739200000)/
String.prototype.fmtjsondate = function (formatter) {
    if (this == "") return "";
    formatter = !formatter ? "yyyy-MM-dd" : formatter;
    var date = new Date(parseInt(this.replace("/Date(", "").replace(")/", ""), 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var current_date = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var val = formatter;
    val = val.replace("yyyy", date.getFullYear());
    val = val.replace("YYYY", date.getFullYear());
    val = val.replace("MM", month);
    val = val.replace("dd", current_date);
    val = val.replace("DD", current_date);
    val = val.replace("hh", date.getHours());
    val = val.replace("HH", date.getHours());
    val = val.replace("mm", date.getMinutes());
    val = val.replace("ss", date.getSeconds());
    val = val.replace("SS", date.getSeconds());
    return val;
};

//对Date的扩展，将 Date 转化为指定格式的String
/**  
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符  
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)  
* eg:  
* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423  
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04  
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04  
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04  
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18  
*/
Date.prototype.format = function (fmt) {
    if (fmt == undefined) {
        return "";
    }
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时   
        "H+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    var week = { "0": "\u65e5", "1": "\u4e00", "2": "\u4e8c", "3": "\u4e09", "4": "\u56db", "5": "\u4e94", "6": "\u516d" };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

//人性化时间
Date.prototype.humanetime = function () {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var year = month * 12;
    var result = "";
    var now = new Date().getTime();
    var diff_value = now - this.getTime();
    if (diff_value < 0) {
        alert("结束日期不能小于开始日期！");
    }
    var year_c = diff_value / year;
    var month_c = diff_value / month;
    var week_c = diff_value / (7 * day);
    var day_c = diff_value / day;
    var hour_c = diff_value / hour;
    var min_c = diff_value / minute;

    if (month_c >= 1) {
        result = parseInt(year_c, 10) + "年前";
    } else if (month_c >= 1) {
        result = parseInt(month_c, 10) + "个月前";
    } else if (week_c >= 1) {
        result = parseInt(week_c, 10) + "个星期前";
    } else if (day_c >= 1) {
        switch (Math.floor(day_c)) {
            case 1:
                result = "昨天" + this.format("HH:mm"); break;
            case 2:
                result = "前天" + this.format("HH:mm"); break;
            default:
                result = parseInt(day_c, 10) + "天前"; break;
        }
    } else if (hour_c >= 1) {
        result = parseInt(hour_c, 10) + "个小时前";
    } else if (min_c >= 1) {
        result = parseInt(min_c, 10) + "分钟前";
    } else
        result = "刚刚";
    return result;
};
