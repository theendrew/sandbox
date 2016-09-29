exports.doConfirm = doConfirm;
function doConfirm(docType, ids) {
    var mode = null, idsStk = null, res = null, answer = null, data = null, docId = null, response = null, docCount = null, params = null, confirmCase = null;
    return new Promise(function(resolve, reject) {
        return function() {
            idsStk = new StringTokenizer(ids, ";");
            docCount = idsStk.countTokens();
            function $tmp1089() {
                return resolve();
            }
            return docCount === 1 && docType === "doc/payment" ? function() {
                docId = idsStk.nextElement();
                params = {"DOC_ID":docId, "DOC_TYPE":docType};
                execPromisedReq(params, "GET_CONFIRM_CASE", null).then(function($tmp1091) {
                    response = $tmp1091;
                    typeOf(response) === "exception" ? function() {
                        throw new Error(getErrorMessage(response));
                    }() : null;
                    confirmCase = get(response, "CONFIRM_CASE");
                    function $tmp1090() {
                        return $tmp1089();
                    }
                    confirmCase === "ADD_TRUSTED_RECIPIENT_QUESTION" || confirmCase === "ACTIVATE_DELETED_TRUSTED_RECIPIENT_QUESTION" ? function() {
                        mode = "ADD_TRUSTED_RECIPIENT_QUESTION" === confirmCase ? "ADD_RCPT" : "ACTIVATE_RCPT";
                        showOverlimitDlg(getParent(), mode).then(function($tmp1093) {
                            answer = $tmp1093;
                            function $tmp1092() {
                                return $tmp1090();
                            }
                            answer === "CONFIRM" ? function() {
                                loadExtAuthInfo(docType, docId).then(function($tmp1095) {
                                    res = $tmp1095;
                                    function $tmp1094() {
                                        return $tmp1092();
                                    }
                                    res ? function() {
                                        startConfirmation(docType, docId).then(function() {
                                            $tmp1094();
                                        })["catch"](function(err) {
                                            reject(err);
                                        });
                                    }() : $tmp1094();
                                })["catch"](function(err) {
                                    reject(err);
                                });
                            }() : answer === "TRUSTED_RCPT" ? function() {
                                loadExtAuthInfo(docType, docId).then(function($tmp1097) {
                                    res = $tmp1097;
                                    function $tmp1096() {
                                        return $tmp1092();
                                    }
                                    res ? function() {
                                        addOrActivateTrustedRcpt(docId).then(function() {
                                            $tmp1096();
                                        })["catch"](function(err) {
                                            reject(err);
                                        });
                                    }() : $tmp1096();
                                })["catch"](function(err) {
                                    reject(err);
                                });
                            }() : true ? $tmp1092() : null;
                        })["catch"](function(err) {
                            reject(err);
                        });
                    }() : confirmCase === "REQUIRES_CONFIRMATION" ? function() {
                        loadExtAuthInfo(docType, docId).then(function($tmp1099) {
                            res = $tmp1099;
                            function $tmp1098() {
                                return $tmp1090();
                            }
                            res ? function() {
                                startConfirmation(docType, docId).then(function() {
                                    $tmp1098();
                                })["catch"](function(err) {
                                    reject(err);
                                });
                            }() : $tmp1098();
                        })["catch"](function(err) {
                            reject(err);
                        });
                    }() : confirmCase === "TRANSFER_TO_READY" ? function() {
                        loadExtAuthInfo(docType, docId).then(function($tmp1101) {
                            res = $tmp1101;
                            function $tmp1100() {
                                return $tmp1090();
                            }
                            res ? function() {
                                data = {"CT":docType, "ID":docId, "OTPT":"NONE"};
                                put(reqProp, "data", data);
                                sendConfirmReq().then(function() {
                                    $tmp1100();
                                })["catch"](function(err) {
                                    reject(err);
                                });
                            }() : $tmp1100();
                        })["catch"](function(err) {
                            reject(err);
                        });
                    }() : null;
                })["catch"](function(err) {
                    reject(err);
                });
            }() : function() {
                put(reqProp, "group-confirmation", "true");
                loadExtAuthInfo(docType, ids).then(function($tmp1103) {
                    res = $tmp1103;
                    function $tmp1102() {
                        return $tmp1089();
                    }
                    res ? function() {
                        startConfirmation(docType, ids).then(function() {
                            $tmp1102();
                        })["catch"](function(err) {
                            reject(err);
                        });
                    }() : $tmp1102();
                })["catch"](function(err) {
                    reject(err);
                });
            }();
        }();
    });
}/**
 * Created by ivanov_aa on 11.07.16.
 */
function showErr$1(msg) {
    return
        new Promise(
            function(resolve, reject) {
                GuiHelper.showMessageDialog(getDelegate(DocumentBrowser.getInstance().getActiveEditor()), "Ошибка", getErrorMessage(msg), 0, getLocale())
                    .then(function() {
                        return resolve();
                        })
                    ["catch"]
                (function(err) {
                    reject(err);
            });
        });
}


PrimeFaces.widget.Dialog = PrimeFaces.widget.BaseWidget.extend({
    init: function (a) {
        this._super(a);
        this.content = this.jq.children(".ui-dialog-content");
        this.titlebar = this.jq.children(".ui-dialog-titlebar");
        this.footer = this.jq.find(".ui-dialog-footer");
        this.icons = this.titlebar.children(".ui-dialog-titlebar-icon");
        this.closeIcon = this.titlebar.children(".ui-dialog-titlebar-close");
        this.minimizeIcon = this.titlebar.children(".ui-dialog-titlebar-minimize");
        this.maximizeIcon = this.titlebar.children(".ui-dialog-titlebar-maximize");
        this.blockEvents = "focus.dialog mousedown.dialog mouseup.dialog keydown.dialog keyup.dialog";
        this.cfg.width = this.cfg.width || "auto";
        this.cfg.height = this.cfg.height || "auto";
        this.cfg.draggable = this.cfg.draggable == false ? false : true;
        this.cfg.resizable = this.cfg.resizable == false ? false : true;
        this.cfg.minWidth = this.cfg.minWidth || 150;
        this.cfg.minHeight = this.cfg.minHeight || this.titlebar.outerHeight();
        this.cfg.position = this.cfg.position || "center";
        this.parent = this.jq.parent();
        this.jq.css({width: this.cfg.width, height: "auto"});
        this.content.height(this.cfg.height);
        this.bindEvents();
        if (this.cfg.draggable) {
            this.setupDraggable()
        }
        if (this.cfg.resizable) {
            this.setupResizable()
        }
        if (this.cfg.modal) {
            this.syncWindowResize()
        }
        if (this.cfg.appendToBody) {
            this.jq.appendTo("body")
        }
        if ($(document.body).children(".ui-dialog-docking-zone").length == 0) {
            $(document.body).append('<div class="ui-dialog-docking-zone"></div>')
        }
        var b = $(this.jqId + "_modal");
        if (b.length > 0) {
            b.remove()
        }
        this.applyARIA();
        if (this.cfg.visible) {
            this.show()
        }
    }, refresh: function (a) {
        this.positionInitialized = false;
        this.loaded = false;
        $(document).off("keydown.dialog_" + a.id);
        this.init(a)
    }, enableModality: function () {
        var a = this;
        $(document.body).append('<div id="' + this.id + '_modal" class="ui-widget-overlay"></div>').children(this.jqId + "_modal").css({
            width: $(document).width(),
            height: $(document).height(),
            "z-index": this.jq.css("z-index") - 1
        });
        $(document).bind("keydown.modal-dialog", function (d) {
            if (d.keyCode == $.ui.keyCode.TAB) {
                var c = a.content.find(":tabbable"), e = c.filter(":first"), b = c.filter(":last");
                if (d.target === b[0] && !d.shiftKey) {
                    e.focus(1);
                    return false
                } else {
                    if (d.target === e[0] && d.shiftKey) {
                        b.focus(1);
                        return false
                    }
                }
            }
        }).bind(this.blockEvents, function (b) {
            if ($(b.target).zIndex() < a.jq.zIndex()) {
                return false
            }
        })
    }, disableModality: function () {
        $(document.body).children(this.jqId + "_modal").remove();
        $(document).unbind(this.blockEvents).unbind("keydown.modal-dialog")
    }, syncWindowResize: function () {
        $(window).resize(function () {
            $(document.body).children(".ui-widget-overlay").css({
                width: $(document).width(),
                height: $(document).height()
            })
        })
    }, show: function () {
        if (this.jq.hasClass("ui-overlay-visible")) {
            return
        }
        if (!this.loaded && this.cfg.dynamic) {
            this.loadContents()
        } else {
            if (!this.positionInitialized) {
                this.initPosition()
            }
            this._show()
        }
    }, _show: function () {
        this.jq.removeClass("ui-overlay-hidden").addClass("ui-overlay-visible").css({
            display: "none",
            visibility: "visible"
        });
        if (this.cfg.showEffect) {
            var a = this;
            this.jq.show(this.cfg.showEffect, null, "normal", function () {
                a.postShow()
            })
        } else {
            this.jq.show();
            this.postShow()
        }
        this.moveToTop();
        if (this.cfg.modal) {
            this.enableModality()
        }
    }, postShow: function () {
        if (this.cfg.onShow) {
            this.cfg.onShow.call(this)
        }
        this.jq.attr({"aria-hidden": false, "aria-live": "polite"});
        this.applyFocus()
    }, hide: function () {
        if (this.jq.hasClass("ui-overlay-hidden")) {
            return
        }
        if (this.cfg.hideEffect) {
            var a = this;
            this.jq.hide(this.cfg.hideEffect, null, "normal", function () {
                a.onHide()
            })
        } else {
            this.jq.hide();
            this.onHide()
        }
        if (this.cfg.modal) {
            this.disableModality()
        }
    }, applyFocus: function () {
        this.jq.find(":not(:submit):not(:button):input:visible:enabled:first").focus()
    }, bindEvents: function () {
        var a = this;
        this.jq.mousedown(function (b) {
            if (!$(b.target).data("primefaces-overlay-target")) {
                a.moveToTop()
            }
        });
        this.icons.mouseover(function () {
            $(this).addClass("ui-state-hover")
        }).mouseout(function () {
            $(this).removeClass("ui-state-hover")
        });
        this.closeIcon.click(function (b) {
            a.hide();
            b.preventDefault()
        });
        this.maximizeIcon.click(function (b) {
            a.toggleMaximize();
            b.preventDefault()
        });
        this.minimizeIcon.click(function (b) {
            a.toggleMinimize();
            b.preventDefault()
        });
        if (this.cfg.closeOnEscape) {
            $(document).on("keydown.dialog_" + this.id, function (d) {
                var c = $.ui.keyCode, b = parseInt(a.jq.css("z-index")) === PrimeFaces.zindex;
                if (d.which === c.ESCAPE && a.jq.hasClass("ui-overlay-visible") && b) {
                    a.hide()
                }
            })
        }
    }, setupDraggable: function () {
        this.jq.draggable({
            cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
            handle: ".ui-dialog-titlebar",
            containment: "document"
        })
    }, setupResizable: function () {
        var a = this;
        this.jq.resizable({
            handles: "n,s,e,w,ne,nw,se,sw",
            minWidth: this.cfg.minWidth,
            minHeight: this.cfg.minHeight,
            alsoResize: this.content,
            containment: "document",
            start: function (b, c) {
                a.jq.data("offset", a.jq.offset())
            },
            stop: function (b, c) {
                var d = a.jq.data("offset");
                a.jq.css("position", "fixed");
                a.jq.offset(d)
            }
        });
        this.resizers = this.jq.children(".ui-resizable-handle")
    }, initPosition: function () {
        this.jq.css({left: 0, top: 0});
        if (/(center|left|top|right|bottom)/.test(this.cfg.position)) {
            this.cfg.position = this.cfg.position.replace(",", " ");
            this.jq.position({
                my: "center", at: this.cfg.position, collision: "fit", of: window, using: function (f) {
                    var d = f.left < 0 ? 0 : f.left, e = f.top < 0 ? 0 : f.top;
                    $(this).css({left: d, top: e})
                }
            })
        } else {
            var b = this.cfg.position.split(","), a = $.trim(b[0]), c = $.trim(b[1]);
            this.jq.offset({left: a, top: c})
        }
        this.positionInitialized = true
    }, onHide: function (b, c) {
        this.jq.removeClass("ui-overlay-visible").addClass("ui-overlay-hidden").css({
            display: "block",
            visibility: "hidden"
        });
        if (this.cfg.onHide) {
            this.cfg.onHide.call(this, b, c)
        }
        if (this.cfg.behaviors) {
            var a = this.cfg.behaviors.close;
            if (a) {
                a.call(this)
            }
        }
        this.jq.attr({"aria-hidden": true, "aria-live": "off"})
    }, moveToTop: function () {
        this.jq.css("z-index", ++PrimeFaces.zindex)
    }, toggleMaximize: function () {
        if (this.minimized) {
            this.toggleMinimize()
        }
        if (this.maximized) {
            this.jq.removeClass("ui-dialog-maximized");
            this.restoreState();
            this.maximizeIcon.children(".ui-icon").removeClass("ui-icon-newwin").addClass("ui-icon-extlink");
            this.maximized = false
        } else {
            this.saveState();
            var b = $(window);
            this.jq.addClass("ui-dialog-maximized").css({
                width: b.width() - 6,
                height: b.height()
            }).offset({top: b.scrollTop(), left: b.scrollLeft()});
            this.content.css({width: "auto", height: "auto"});
            this.maximizeIcon.removeClass("ui-state-hover").children(".ui-icon").removeClass("ui-icon-extlink").addClass("ui-icon-newwin");
            this.maximized = true;
            if (this.cfg.behaviors) {
                var a = this.cfg.behaviors.maximize;
                if (a) {
                    a.call(this)
                }
            }
        }
    }, toggleMinimize: function () {
        var b = true, c = $(document.body).children(".ui-dialog-docking-zone");
        if (this.maximized) {
            this.toggleMaximize();
            b = false
        }
        var a = this;
        if (this.minimized) {
            this.jq.appendTo(this.parent).removeClass("ui-dialog-minimized").css({position: "fixed", "float": "none"});
            this.restoreState();
            this.content.show();
            this.minimizeIcon.removeClass("ui-state-hover").children(".ui-icon").removeClass("ui-icon-plus").addClass("ui-icon-minus");
            this.minimized = false;
            if (this.cfg.resizable) {
                this.resizers.show()
            }
        } else {
            this.saveState();
            if (b) {
                this.jq.effect("transfer", {to: c, className: "ui-dialog-minimizing"}, 500, function () {
                    a.dock(c);
                    a.jq.addClass("ui-dialog-minimized")
                })
            } else {
                this.dock(c)
            }
        }
    }, dock: function (a) {
        this.jq.appendTo(a).css("position", "static");
        this.jq.css({height: "auto", width: "auto", "float": "left"});
        this.content.hide();
        this.minimizeIcon.removeClass("ui-state-hover").children(".ui-icon").removeClass("ui-icon-minus").addClass("ui-icon-plus");
        this.minimized = true;
        if (this.cfg.resizable) {
            this.resizers.hide()
        }
        if (this.cfg.behaviors) {
            var b = this.cfg.behaviors.minimize;
            if (b) {
                b.call(this)
            }
        }
    }, saveState: function () {
        this.state = {width: this.jq.width(), height: this.jq.height()};
        var a = $(window);
        this.state.offset = this.jq.offset();
        this.state.windowScrollLeft = a.scrollLeft();
        this.state.windowScrollTop = a.scrollTop()
    }, restoreState: function (a) {
        this.jq.width(this.state.width).height(this.state.height);
        var b = $(window);
        this.jq.offset({
            top: this.state.offset.top + (b.scrollTop() - this.state.windowScrollTop),
            left: this.state.offset.left + (b.scrollLeft() - this.state.windowScrollLeft)
        })
    }, loadContents: function () {
        var b = {source: this.id, process: this.id, update: this.id}, a = this;
        b.onsuccess = function (g) {
            var e = $(g.documentElement), f = e.find("update");
            for (var c = 0; c < f.length; c++) {
                var j = f.eq(c), h = j.attr("id"), d = j.text();
                if (h == a.id) {
                    a.content.html(d);
                    a.loaded = true
                } else {
                    PrimeFaces.ajax.AjaxUtils.updateElement.call(this, h, d)
                }
            }
            PrimeFaces.ajax.AjaxUtils.handleResponse.call(this, e);
            return true
        };
        b.oncomplete = function () {
            a.show()
        };
        b.params = [{name: this.id + "_contentLoad", value: true}];
        PrimeFaces.ajax.AjaxRequest(b)
    }, applyARIA: function () {
        this.jq.attr({role: "dialog", "aria-labelledby": this.id + "_title", "aria-hidden": !this.cfg.visible});
        this.titlebar.children("a.ui-dialog-titlebar-icon").attr("role", "button")
    }
});
PrimeFaces.widget.ConfirmDialog = PrimeFaces.widget.Dialog.extend({
    init: function (a) {
        a.draggable = false;
        a.resizable = false;
        a.modal = true;
        this._super(a)
    }, applyFocus: function () {
        this.jq.find(":button,:submit").filter(":visible:enabled").eq(0).focus()
    }
});

/////////////////////////////////////
(function (a) {
    if (a.PrimeFaces) {
        PrimeFaces.debug("PrimeFaces already loaded, ignoring duplicate execution.");
        return
    }
    PrimeFaces = {
        escapeClientId: function (b) {
            return "#" + b.replace(/:/g, "\\:")
        },
        cleanWatermarks: function () {
            $.watermark.hideAll()
        },
        showWatermarks: function () {
            $.watermark.showAll()
        },
        addSubmitParam: function (c, e) {
            var d = $(this.escapeClientId(c));
            for (var b in e) {
                d.append('<input type="hidden" name="' + b + '" value="' + e[b] + '" class="ui-submit-param"/>')
            }
            return this
        },
        submit: function (b) {
            $(this.escapeClientId(b)).submit().children("input.ui-submit-param").remove()
        },
        attachBehaviors: function (c, b) {
            $.each(b, function (e, d) {
                c.bind(e, function (f) {
                    d.call(c, f)
                })
            })
        },
        getCookie: function (b) {
            return $.cookie(b)
        },
        setCookie: function (b, c) {
            $.cookie(b, c)
        },
        skinInput: function (b) {
            b.hover(function () {
                $(this).addClass("ui-state-hover")
            }, function () {
                $(this).removeClass("ui-state-hover")
            }).focus(function () {
                $(this).addClass("ui-state-focus")
            }).blur(function () {
                $(this).removeClass("ui-state-focus")
            });
            b.attr("role", "textbox").attr("aria-disabled", b.is(":disabled")).attr("aria-readonly", b.prop("readonly")).attr("aria-multiline", b.is("textarea"));
            return this
        },
        skinButton: function (b) {
            b.mouseover(function () {
                var c = $(this);
                if (!b.hasClass("ui-state-disabled")) {
                    c.addClass("ui-state-hover")
                }
            }).mouseout(function () {
                $(this).removeClass("ui-state-active ui-state-hover")
            }).mousedown(function () {
                var c = $(this);
                if (!b.hasClass("ui-state-disabled")) {
                    c.addClass("ui-state-active").removeClass("ui-state-hover")
                }
            }).mouseup(function () {
                $(this).removeClass("ui-state-active").addClass("ui-state-hover")
            }).focus(function () {
                $(this).addClass("ui-state-focus")
            }).blur(function () {
                $(this).removeClass("ui-state-focus ui-state-active")
            }).keydown(function (c) {
                if (c.keyCode == $.ui.keyCode.SPACE || c.keyCode == $.ui.keyCode.ENTER || c.keyCode == $.ui.keyCode.NUMPAD_ENTER) {
                    $(this).addClass("ui-state-active")
                }
            }).keyup(function () {
                $(this).removeClass("ui-state-active")
            });
            b.attr("role", "button").attr("aria-disabled", b.is(":disabled"));
            return this
        },
        skinSelect: function (b) {
            b.mouseover(function () {
                var c = $(this);
                if (!c.hasClass("ui-state-focus")) {
                    c.addClass("ui-state-hover")
                }
            }).mouseout(function () {
                $(this).removeClass("ui-state-hover")
            }).focus(function () {
                $(this).addClass("ui-state-focus").removeClass("ui-state-hover")
            }).blur(function () {
                $(this).removeClass("ui-state-focus ui-state-hover")
            });
            return this
        },
        isIE: function (b) {
            return ($.browser.msie && parseInt($.browser.version, 10) == b)
        },
        ab: function (b, c) {
            PrimeFaces.ajax.AjaxRequest(b, c)
        },
        info: function (b) {
            if (this.logger) {
                this.logger.info(b)
            }
        },
        debug: function (b) {
            if (this.logger) {
                this.logger.debug(b)
            }
        },
        warn: function (b) {
            if (this.logger) {
                this.logger.warn(b)
            }
        },
        error: function (b) {
            if (this.logger) {
                this.logger.error(b)
            }
        },
        setCaretToEnd: function (c) {
            if (c) {
                c.focus();
                var d = c.value.length;
                if (d > 0) {
                    if (c.setSelectionRange) {
                        c.setSelectionRange(0, d)
                    } else {
                        if (c.createTextRange) {
                            var b = c.createTextRange();
                            b.collapse(true);
                            b.moveEnd("character", 1);
                            b.moveStart("character", 1);
                            b.select()
                        }
                    }
                }
            }
        },
        changeTheme: function (f) {
            if (f && f != "") {
                var g = $('link[href*="javax.faces.resource/theme.css"]'), e = g.attr("href"), d = e.split("&")[0], c = d.split("ln=")[1], b = e.replace(c, "primefaces-" + f);
                g.attr("href", b)
            }
        },
        escapeRegExp: function (b) {
            return b.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        },
        escapeHTML: function (b) {
            return b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        clearSelection: function () {
            if (a.getSelection) {
                if (a.getSelection().empty) {
                    a.getSelection().empty()
                } else {
                    if (a.getSelection().removeAllRanges) {
                        a.getSelection().removeAllRanges()
                    }
                }
            } else {
                if (document.selection && document.selection.empty) {
                    document.selection.empty()
                }
            }
        },
        cw: function (b, e, c, d) {
            PrimeFaces.createWidget(b, e, c, d)
        },
        createWidget: function (b, h, d, f) {
            if (PrimeFaces.widget[b]) {
                if (a[h]) {
                    a[h].refresh(d)
                } else {
                    a[h] = new PrimeFaces.widget[b](d)
                }
            } else {
                var e = $('script[src*="/javax.faces.resource/primefaces.js"]').attr("src").replace("primefaces.js", f + "/" + f + ".js"), g = $('link[href*="/javax.faces.resource/primefaces.css"]').attr("href").replace("primefaces.css", f + "/" + f + ".css"), c = '<link type="text/css" rel="stylesheet" href="' + g + '" />';
                $("head").append(c);
                PrimeFaces.getScript(location.protocol + "//" + location.host + e, function () {
                    setTimeout(function () {
                        a[h] = new PrimeFaces.widget[b](d)
                    }, 100)
                })
            }
        },
        inArray: function (b, d) {
            for (var c = 0; c < b.length; c++) {
                if (b[c] === d) {
                    return true
                }
            }
            return false
        },
        isNumber: function (b) {
            return typeof b === "number" && isFinite(b)
        },
        getScript: function (b, c) {
            $.ajax({type: "GET", url: b, success: c, dataType: "script", cache: true})
        },
        focus: function (d, c) {
            var b = ":not(:submit):not(:button):input:visible:enabled";
            setTimeout(function () {
                if (d) {
                    var e = $(PrimeFaces.escapeClientId(d));
                    if (e.is(b)) {
                        e.focus()
                    } else {
                        e.find(b).eq(0).focus()
                    }
                } else {
                    if (c) {
                        $(PrimeFaces.escapeClientId(c)).find(b).eq(0).focus()
                    } else {
                        $(b).eq(0).focus()
                    }
                }
            }, 250)
        },
        monitorDownload: function (c, b) {
            if (c) {
                c()
            }
            a.downloadMonitor = setInterval(function () {
                var d = PrimeFaces.getCookie("primefaces.download");
                if (d == "true") {
                    if (b) {
                        b()
                    }
                    clearInterval(a.downloadPoll);
                    PrimeFaces.setCookie("primefaces.download", null)
                }
            }, 500)
        },
        scrollTo: function (c) {
            var b = $(PrimeFaces.escapeClientId(c)).offset();
            $("html,body").animate({scrollTop: b.top, scrollLeft: b.left}, {easing: "easeInCirc"}, 1000)
        },
        scrollInView: function (c, f) {
            if (f.length == 0) {
                return
            }
            var i = parseFloat(c.css("borderTopWidth")) || 0, e = parseFloat(c.css("paddingTop")) || 0, g = f.offset().top - c.offset().top - i - e, b = c.scrollTop(), d = c.height(), h = f.outerHeight(true);
            if (g < 0) {
                c.scrollTop(b + g)
            } else {
                if ((g + h) > d) {
                    c.scrollTop(b + g - d + h)
                }
            }
        },
        calculateScrollbarWidth: function () {
            if (!this.scrollbarWidth) {
                if ($.browser.msie) {
                    var d = $('<textarea cols="10" rows="2"></textarea>').css({
                        position: "absolute",
                        top: -1000,
                        left: -1000
                    }).appendTo("body"), c = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({
                        position: "absolute",
                        top: -1000,
                        left: -1000
                    }).appendTo("body");
                    this.scrollbarWidth = d.width() - c.width();
                    d.add(c).remove()
                } else {
                    var b = $("<div />").css({
                        width: 100,
                        height: 100,
                        overflow: "auto",
                        position: "absolute",
                        top: -1000,
                        left: -1000
                    }).prependTo("body").append("<div />").find("div").css({width: "100%", height: 200});
                    this.scrollbarWidth = 100 - b.width();
                    b.parent().remove()
                }
            }
            return this.scrollbarWidth
        },
        locales: {},
        zindex: 1000,
        PARTIAL_REQUEST_PARAM: "javax.faces.partial.ajax",
        PARTIAL_UPDATE_PARAM: "javax.faces.partial.render",
        PARTIAL_PROCESS_PARAM: "javax.faces.partial.execute",
        PARTIAL_SOURCE_PARAM: "javax.faces.source",
        BEHAVIOR_EVENT_PARAM: "javax.faces.behavior.event",
        PARTIAL_EVENT_PARAM: "javax.faces.partial.event",
        VIEW_STATE: "javax.faces.ViewState",
        VIEW_ROOT: "javax.faces.ViewRoot",
        CLIENT_ID_DATA: "primefaces.clientid"
    };
    PrimeFaces.ajax = {};
    PrimeFaces.widget = {};
    PrimeFaces.ajax.AjaxUtils = {
        encodeViewState: function () {
            var b = document.getElementById(PrimeFaces.VIEW_STATE).value;
            var d = new RegExp("\\+", "g");
            var c = b.replace(d, "%2B");
            return c
        }, updateState: function (d) {
            var b = $.trim(d), c = this.portletForms ? this.portletForms : $("form");
            c.each(function () {
                var e = $(this), f = e.children("input[name='javax.faces.ViewState']").get(0);
                if (f) {
                    $(f).val(b)
                } else {
                    e.append('<input type="hidden" name="javax.faces.ViewState" id="javax.faces.ViewState" value="' + b + '" autocomplete="off" />')
                }
            })
        }, updateElement: function (c, b) {
            if (c == PrimeFaces.VIEW_STATE) {
                PrimeFaces.ajax.AjaxUtils.updateState.call(this, b)
            } else {
                if (c == PrimeFaces.VIEW_ROOT) {
                    $("head").html(b.substring(b.indexOf("<head>") + 6, b.lastIndexOf("</head>")));
                    $("body").html(b.substring(b.indexOf("<body>") + 6, b.lastIndexOf("</body>")))
                } else {
                    $(PrimeFaces.escapeClientId(c)).replaceWith(b)
                }
            }
        }, handleResponse: function (e) {
            var f = e.find("redirect"), c = e.find('extension[ln="primefaces"][type="args"]'), b = e.find("eval");
            if (f.length > 0) {
                a.location = f.attr("url")
            } else {
                this.args = c.length > 0 ? $.parseJSON(c.text()) : {};
                for (var d = 0; d < b.length; d++) {
                    $.globalEval(b.eq(d).text())
                }
            }
        }, findComponents: function (b) {
            var e = b.substring(2, b.length - 1), d = $(e), c = [];
            d.each(function () {
                var g = $(this), f = g.data(PrimeFaces.CLIENT_ID_DATA) || g.attr("id");
                c.push(f)
            });
            return c
        }, idsToArray: function (d, h, c) {
            var b = [], j = d[h], g = d.ext ? d.ext[h] : null;
            if (j) {
                $.merge(b, j.split(" "))
            }
            if (g) {
                var f = g.split(" ");
                for (var e = 0; e < f.length; e++) {
                    if (!PrimeFaces.inArray(b, f[e])) {
                        b.push(f[e])
                    }
                }
            }
            if (c) {
                $.merge(b, PrimeFaces.ajax.AjaxUtils.findComponents(c))
            }
            return b
        }, send: function (n) {
            PrimeFaces.debug("Initiating ajax request.");
            if (n.onstart) {
                var e = n.onstart.call(this, n);
                if (e == false) {
                    PrimeFaces.debug("Ajax request cancelled by onstart callback.");
                    if (!n.async) {
                        PrimeFaces.ajax.Queue.poll()
                    }
                    return
                }
            }
            var d = null, q = null;
            if (typeof(n.source) == "string") {
                q = n.source
            } else {
                q = $(n.source).attr("id")
            }
            if (n.formId) {
                d = $(PrimeFaces.escapeClientId(n.formId))
            } else {
                d = $(PrimeFaces.escapeClientId(q)).parents("form:first");
                if (d.length == 0) {
                    d = $("form").eq(0)
                }
            }
            PrimeFaces.debug("Form to post " + d.attr("id") + ".");
            var c = d.attr("action"), g = d.children("input[name='javax.faces.encodedURL']"), p = [];
            var f = null;
            if (g.length > 0) {
                c = g.val();
                f = $('form[action="' + d.attr("action") + '"]')
            }
            PrimeFaces.debug("URL to post " + c + ".");
            p.push({name: PrimeFaces.PARTIAL_REQUEST_PARAM, value: true});
            p.push({name: PrimeFaces.PARTIAL_SOURCE_PARAM, value: q});
            var m = PrimeFaces.ajax.AjaxUtils.idsToArray(n, "process", n.processSelector), i = m.length > 0 ? m.join(" ") : "@all";
            p.push({name: PrimeFaces.PARTIAL_PROCESS_PARAM, value: i});
            var j = PrimeFaces.ajax.AjaxUtils.idsToArray(n, "update", n.updateSelector);
            if (j.length > 0) {
                p.push({name: PrimeFaces.PARTIAL_UPDATE_PARAM, value: j.join(" ")})
            }
            if (n.event) {
                p.push({name: PrimeFaces.BEHAVIOR_EVENT_PARAM, value: n.event});
                var l = n.event;
                if (n.event == "valueChange") {
                    l = "change"
                } else {
                    if (n.event == "action") {
                        l = "click"
                    }
                }
                p.push({name: PrimeFaces.PARTIAL_EVENT_PARAM, value: l})
            } else {
                p.push({name: q, value: q})
            }
            if (n.params) {
                $.merge(p, n.params)
            }
            if (n.ext && n.ext.params) {
                $.merge(p, n.ext.params)
            }
            if (n.partialSubmit && i != "@all") {
                var o = false;
                if (i != "@none") {
                    var h = i.split(" ");
                    $.each(h, function (t, u) {
                        var s = $(PrimeFaces.escapeClientId(u)), r = null;
                        if (s.is("form")) {
                            r = s.serializeArray();
                            o = true
                        } else {
                            if (s.is(":input")) {
                                r = s.serializeArray()
                            } else {
                                r = s.find(":input").serializeArray()
                            }
                        }
                        $.merge(p, r)
                    })
                }
                if (!o) {
                    p.push({
                        name: PrimeFaces.VIEW_STATE,
                        value: d.children("input[name='javax.faces.ViewState']").val()
                    })
                }
            } else {
                $.merge(p, d.serializeArray())
            }
            var b = $.param(p);
            PrimeFaces.debug("Post Data:" + b);
            var k = {
                url: c,
                type: "POST",
                cache: false,
                dataType: "xml",
                data: b,
                portletForms: f,
                source: n.source,
                beforeSend: function (r) {
                    r.setRequestHeader("Faces-Request", "partial/ajax")
                }
            };
            k.global = n.global === true || n.global === undefined ? true : false;
            $.ajax(k).done(function (t, r, u) {
                PrimeFaces.debug("Response received succesfully.");
                var s;
                if (n.onsuccess) {
                    s = n.onsuccess.call(this, t, r, u)
                }
                if (n.ext && n.ext.onsuccess && !s) {
                    s = n.ext.onsuccess.call(this, t, r, u)
                }
                if (s) {
                    return
                } else {
                    PrimeFaces.ajax.AjaxResponse.call(this, t, r, u)
                }
                PrimeFaces.debug("DOM is updated.")
            }).fail(function (t, r, s) {
                if (n.onerror) {
                    n.onerror.call(t, r, s)
                }
                PrimeFaces.error("Request return with error:" + r + ".")
            }).always(function (s, r) {
                if (n.oncomplete) {
                    n.oncomplete.call(this, s, r, this.args)
                }
                if (n.ext && n.ext.oncomplete) {
                    n.ext.oncomplete.call(this, s, r, this.args)
                }
                PrimeFaces.debug("Response completed.");
                if (!n.async) {
                    PrimeFaces.ajax.Queue.poll()
                }
            })
        }
    };
    PrimeFaces.ajax.AjaxRequest = function (b, c) {
        b.ext = c;
        if (b.async) {
            PrimeFaces.ajax.AjaxUtils.send(b)
        } else {
            PrimeFaces.ajax.Queue.offer(b)
        }
    };
    PrimeFaces.ajax.AjaxResponse = function (f) {
        var d = $(f.documentElement), e = d.find("update");
        for (var b = 0; b < e.length; b++) {
            var h = e.eq(b), g = h.attr("id"), c = h.text();
            PrimeFaces.ajax.AjaxUtils.updateElement.call(this, g, c)
        }
        PrimeFaces.ajax.AjaxUtils.handleResponse.call(this, d)
    };
    PrimeFaces.ajax.Queue = {
        requests: new Array(), offer: function (b) {
            this.requests.push(b);
            if (this.requests.length == 1) {
                PrimeFaces.ajax.AjaxUtils.send(b)
            }
        }, poll: function () {
            if (this.isEmpty()) {
                return null
            }
            var c = this.requests.shift(), b = this.peek();
            if (b != null) {
                PrimeFaces.ajax.AjaxUtils.send(b)
            }
            return c
        }, peek: function () {
            if (this.isEmpty()) {
                return null
            }
            return this.requests[0]
        }, isEmpty: function () {
            return this.requests.length == 0
        }
    };
    (function () {
        var b = false, c = /xyz/.test(function () {
            xyz
        }) ? /\b_super\b/ : /.*/;
        this.Class = function () {
        };
        Class.extend = function (h) {
            var g = this.prototype;
            b = true;
            var f = new this();
            b = false;
            for (var e in h) {
                f[e] = typeof h[e] == "function" && typeof g[e] == "function" && c.test(h[e]) ? (function (i, j) {
                    return function () {
                        var l = this._super;
                        this._super = g[i];
                        var k = j.apply(this, arguments);
                        this._super = l;
                        return k
                    }
                })(e, h[e]) : h[e]
            }
            function d() {
                if (!b && this.init) {
                    this.init.apply(this, arguments)
                }
            }

            d.prototype = f;
            d.prototype.constructor = d;
            d.extend = arguments.callee;
            return d
        }
    })();
    PrimeFaces.widget.BaseWidget = Class.extend({
        init: function (b) {
            this.cfg = b;
            this.id = b.id;
            this.jqId = PrimeFaces.escapeClientId(this.id), this.jq = $(this.jqId);
            $(this.jqId + "_s").remove()
        }, refresh: function (b) {
            return this.init(b)
        }, getJQ: function () {
            return this.jq
        }
    });
    a.PrimeFaces = PrimeFaces
})(window);

