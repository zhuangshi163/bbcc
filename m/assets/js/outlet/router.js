define("core/common", ["jquery"],
function(t) {
    t(document).ajaxSend(function(t, e, i) {
        e.setRequestHeader("app-key", window._global.app_key),
        e.setRequestHeader("access-token", window._global.access_token),
        "PUT" == i.type && (i.type = "POST", e.setRequestHeader("x-http-method-override", "put"))
    }),
    t(document).ajaxError(function(t, e) {
        if (console.log(e), response = e.responseJSON, 403 == e.status) {
            var i = encodeURIComponent(document.location.href);
            window.location.href = _global.shop_url + "welcome/resign?redirect_uri=" + i
        }
    })
}),
define("apps/newoutlet/models/apply", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "is_be_distributor?id=" + _global.shop.id
        }
    })
}),
function() {
    "use strict";
    function t() {
        var t = {
            "&": "&#38;",
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "/": "&#47;"
        },
        e = /&(?!#?\w+;)|<|>|"|'|\//g;
        return function() {
            return this ? this.replace(e,
            function(e) {
                return t[e] || e
            }) : this
        }
    }
    function e(t, i, n) {
        return ("string" == typeof i ? i: i.toString()).replace(t.define || s,
        function(e, i, r, o) {
            return 0 === i.indexOf("def.") && (i = i.substring(4)),
            i in n || (":" === r ? (t.defineParams && o.replace(t.defineParams,
            function(t, e, r) {
                n[i] = {
                    arg: e,
                    text: r
                }
            }), i in n || (n[i] = o)) : new Function("def", "def['" + i + "']=" + o)(n)),
            ""
        }).replace(t.use || s,
        function(i, r) {
            t.useParams && (r = r.replace(t.useParams,
            function(t, e, i, r) {
                if (n[i] && n[i].arg && r) {
                    var o = (i + ":" + r).replace(/'|\\/g, "_");
                    return n.__exp = n.__exp || {},
                    n.__exp[o] = n[i].text.replace(new RegExp("(^|[^\\w$])" + n[i].arg + "([^\\w$])", "g"), "$1" + r + "$2"),
                    e + "def.__exp['" + o + "']"
                }
            }));
            var o = new Function("def", "return " + r)(n);
            return o ? e(t, o, n) : o
        })
    }
    function i(t) {
        return t.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ")
    }
    var n, r = {
        version: "1.0.1",
        templateSettings: {
            evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
            interpolate: /\{\{=([\s\S]+?)\}\}/g,
            encode: /\{\{!([\s\S]+?)\}\}/g,
            use: /\{\{#([\s\S]+?)\}\}/g,
            useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
            define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
            defineParams: /^\s*([\w$]+):([\s\S]+)/,
            conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
            iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
            varname: "it",
            strip: !0,
            append: !0,
            selfcontained: !1
        },
        template: void 0,
        compile: void 0
    };
    "undefined" != typeof module && module.exports ? module.exports = r: "function" == typeof define && define.amd ? define("doT", [],
    function() {
        return r
    }) : (n = function() {
        return this || (0, eval)("this")
    } (), n.doT = r),
    String.prototype.encodeHTML = t();
    var o = {
        append: {
            start: "'+(",
            end: ")+'",
            endencode: "||'').toString().encodeHTML()+'"
        },
        split: {
            start: "';out+=(",
            end: ");out+='",
            endencode: "||'').toString().encodeHTML();out+='"
        }
    },
    s = /$^/;
    r.template = function(n, a, l) {
        a = a || r.templateSettings;
        var h, c, d = a.append ? o.append: o.split,
        u = 0,
        p = a.use || a.define ? e(a, n, l || {}) : n;
        p = ("var out='" + (a.strip ? p.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : p).replace(/'|\\/g, "\\$&").replace(a.interpolate || s,
        function(t, e) {
            return d.start + i(e) + d.end
        }).replace(a.encode || s,
        function(t, e) {
            return h = !0,
            d.start + i(e) + d.endencode
        }).replace(a.conditional || s,
        function(t, e, n) {
            return e ? n ? "';}else if(" + i(n) + "){out+='": "';}else{out+='": n ? "';if(" + i(n) + "){out+='": "';}out+='"
        }).replace(a.iterate || s,
        function(t, e, n, r) {
            return e ? (u += 1, c = r || "i" + u, e = i(e), "';var arr" + u + "=" + e + ";if(arr" + u + "){var " + n + "," + c + "=-1,l" + u + "=arr" + u + ".length-1;while(" + c + "<l" + u + "){" + n + "=arr" + u + "[" + c + "+=1];out+='") : "';} } out+='"
        }).replace(a.evaluate || s,
        function(t, e) {
            return "';" + i(e) + "out+='"
        }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, "").replace(/(\s|;|\}|^|\{)out\+=''\+/g, "$1out+="),
        h && a.selfcontained && (p = "String.prototype.encodeHTML=(" + t.toString() + "());" + p);
        try {
            return new Function(a.varname, p)
        } catch(f) {
            throw "undefined" != typeof console && console.log("Could not create a template function: " + p),
            f
        }
    },
    r.compile = function(t, e) {
        return r.template(t, null, e)
    }
} (),
define("apps/newoutlet/models/extend_field", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "extend_field/?shop_id=" + _global.shop.id
        }
    })
}),
define("text!apps/newoutlet/templates/apply_form.html", [],
function() {
    return '{{if(it.code == 1003){}}\n<p class="notice" style="padding-bottom:0;">欢迎加入<span class="orange">{{=_global.shop.name}}</span>，请填写申请信息！</p>\n<p class="notice" style="padding: 0 10px;">邀请人：\n    <span class="orange">\n    {{if(typeof(_lockInfo) == \'undefined\' || _lockInfo.is_lock == \'0\'){}}\n    {{if(typeof(_global.did) != \'undefined\'){}}{{?typeof(_global.outlet_distributor_name) != \'undefined\'}}{{=_global.outlet_distributor_name}}{{?}}{{}else{}}总部{{}}}</span> (请核对)\n    {{}else{}}\n    {{=_lockInfo.name}}</span> (请核对)\n    {{}}}\n</p>\n<div class="from-control">\n    <div class="input-group">\n        <input class="text input" name="name" placeholder="请填写真实姓名，用于佣金结算" />\n    </div>\n\n    <div class="input-group">\n        <input class="text input" name="mobile" placeholder="请填写手机号码方便联系" />\n    </div>\n\n    {{for(var i in it.extends){}}\n    <div class="input-group">\n        <input class="text input {{?(it.extends[i].is_required == \'1\')}}require{{?}}" data-id="{{=it.extends[i].id}}" data-name="{{=it.extends[i].name}}" name="extend" placeholder="请填写{{=it.extends[i].name}}" />\n    </div>\n    {{}}}\n    {{?it.data.is_agree==\'1\'}}\n    <div class="from-group">\n        <label><input type="checkbox" name="is_agreemented" checked="checked"> 同意</label> <a class="orange js-agree">&lt;&lt;分销商协议&gt;&gt;</a>\n    </div>\n    {{?}}\n</div>\n<a href="javascript:;" class="js-apply-btn btn btn-warning btn-big" style="margin:0 10px 25px;">申请成为分销商</a>\n{{}else if(it.code == 1004){}}\n<p class="notice">本店累计消费满<span class="orange"> {{=it.data.condition_money}} </span>元，才可申请成为{{=_global.shop.name}}分销商，您已消费<span class="orange"> {{=it.data.order_amount}} </span>元，请继续努力！</p>\n<a href="{{=_global.shop_url}}{{?_global.did != undefined}}?did={{=_global.did}}{{?}}" class="btn btn-warning btn-big" style="margin:0 10px 25px;"><i class="iconfont">&#xe624</i> 继续购物</a>\n{{}}}\n<div class="row">\n    <div class="hd">分销商特权</div>\n    <div class="bd">\n        <div class="item">\n            <i class="iconfont" style="color:#33cd32;">&#xe61b</i>\n            <div class="info">\n                <p class="f14 mb5">独立微店</p>\n                <p class="f12 gray">拥有自己的微店及推广二维码；</p>\n            </div>\n        </div>\n        <!--<div class="item">\n            <i class="iconfont" style="color:#f60;">&#xe605</i>\n            <div class="info">\n                <p class="f14 mb5">采购返现</p>\n                <p class="f12 gray">自己采购，您可获得厂家返现优惠；</p>\n            </div>\n        </div>-->\n        <div class="item">\n            <i class="iconfont" style="color:#fece00;">&#xe606</i>\n            <div class="info">\n                <p class="f14 mb5">销售拿佣金</p>\n                <p class="f12 gray">微店卖出商品，您可以获得佣金；</p>\n            </div>\n        </div>\n        <div class="item">\n            <p class="f12 tint-gray" style="line-height:18px;">分销商的商品销售统一由厂家直接收款、直接发货，并提供产品的售后服务，分销佣金由厂家统一设置。</p>\n        </div>\n    </div>\n</div>\n{{?it.data.is_agree==\'1\'}}\n<div class="agree-dialog js-agree-dialog" style="display: none">\n    <div class="modal-container">\n        <div class="modal-header">\n            <h3>分销商协议</h3>\n        </div>\n        {{var sec_height=document.body.clientWidth+\'px\';}}\n        <div class="modal-body" style="height:{{=sec_height}};">\n            {{=it.data.agreement_content||\'\'}}\n        </div>\n        <div class="modal-footer">\n            <a class="agree-btn js-agree-btn">我已阅读并同意协议</a>\n        </div>\n    </div>\n</div>\n{{?}}\n'
}),
define("apps/newoutlet/views/apply_form", ["backbone", "doT", "apps/newoutlet/models/extend_field", "text!apps/newoutlet/templates/apply_form.html"],
function(t, e, i, n) {
    return t.View.extend({
        template: e.template(n),
        events: {
            "click .js-apply-btn": "apply",
            "click .js-agree": "agree_show",
            "click .js-agree-btn": "agree_hide"
        },
        initialize: function() {
            this.extendaModel = new i,
            this.extendaModel.on("sync", this.load, this)
        },
        render: function() {
            return console.log(_global),
            console.log(this.model.toJSON()),
            this.extendaModel.fetch(),
            this
        },
        load: function() {
            this.model.set("extends", this.extendaModel.toJSON()),
            this.$el.html(this.template(this.model.toJSON())),
            $(".loading").hide()
        },
        agree_show: function() {
            $(".agree-dialog").show()
        },
        agree_hide: function() {
            $(".agree-dialog").hide()
        },
        apply: function(t) {
            var e = this,
            i = $('input[name="name"]', this.$el).val(),
            n = $('input[name="mobile"]', this.$el).val();
            if ("1" == e.model.get("data").is_agree && !$('input[name="is_agreemented"]', this.$el).is(":checked")) return alert("请先同意分销商协议"),
            !1;
            if ("" == i || null == i) return alert("请填写真实姓名"),
            !1;
            if (!n || !/^\d+$/.test(n)) return alert("请填写正确的手机"),
            !1;
            var r = {
                shop_id: _global.shop.id,
                name: i,
                mobile: n,
                is_agreemented: 1
            },
            o = new Array,
            s = !0;
            return $("input[name='extend']").each(function() {
                var t = $(this).data("id"),
                e = $(this).data("name"),
                i = $.trim($(this).val());
                $(this).hasClass("require") && "" == i && (alert("请填写" + e), s = !1);
                var n = {};
                n.id = t,
                n.value = i,
                o.push(n)
            }),
            0 == s ? !1 : (r.field = JSON.stringify(o), r.did = 0, "undefined" == typeof _lockInfo || "0" == _lockInfo.is_lock ? void 0 != _global.did && (r.did = _global.did) : r.did = _lockInfo.id, $(t.target).text("正在提交..."), $(t.target).removeClass("js-apply-btn"), void $.ajax({
                url: _global.url.api + "outlet_distributor",
                type: "POST",
                data: r,
                success: function(t) {
                    console.log(t),
                    e.model.fetch(e.model.get("data"))
                },
                error: function(t) {
                    console.log(t)
                }
            }))
        }
    })
}),
define("text!apps/newoutlet/templates/apply.html", [],
function() {
    return '<div id="header">\n    {{if(typeof(_global.outletbg.img) != \'undefined\'){}}\n    <img class="banner" src="{{=_global.outletbg.img}}">\n    {{}else{}}\n    <img class="banner" src="{{=_global.url.base}}assets/img/wap/outlet/banner_bg.jpg">\n    {{}}}\n</div>\n<div id="content"></div>'
}),
define("text!apps/newoutlet/templates/apply_status.html", [],
function() {
    return '<div class="t_center">\n{{if(it.audit_status == 0){}}\n    <div class="icon-logo">\n        <i class="iconfont" style="color:#8f8f8f;">&#xe62c</i>\n    </div>\n    <p class="f15 gdeep-gray mb20">您的分销申请已经提交，正在审核中！</p>\n    <a class="btn-radius btn-primary" href="{{=_global.shop_url}}{{if(it.parent_id != 0){}}?did={{=it.parent_id}}{{}}}">返回</a>\n{{}else if(it.audit_status == 1){}}\n    <div class="icon-logo">\n        <i class="iconfont" style="color:#00cc32;">&#xe62b</i>\n    </div>\n    <p class="f15 gdeep-gray mb20">您的分销申请已经通过审核！</p>\n    <a class="btn-radius btn-warning" href="{{=_global.shop_url}}?did={{=it.id}}">进入我的小店</a>\n{{}else if(it.audit_status == 2){}}\n    <div class="icon-logo">\n        <i class="iconfont" style="color:#e98818;">&#xe62a</i>\n    </div>\n    <p class="f15 gdeep-gray mb20">对不起！您的分销申请未通过审核！</p>\n    <a class="btn-radius btn-warning js-apply-reset">重新申请</a>\n    <a class="btn-radius btn-primary" href="{{=_global.shop_url}}{{if(it.parent_id != 0){}}?did={{=it.parent_id}}{{}}}">返回</a>\n{{}}}\n</div>'
}),
define("apps/newoutlet/views/apply", ["backbone", "doT", "apps/newoutlet/models/apply", "apps/newoutlet/views/apply_form", "text!apps/newoutlet/templates/apply.html", "text!apps/newoutlet/templates/apply_status.html"],
function(t, e, i, n, r, o) {
    var s = $("#views");
    return t.View.extend({
        id: "view-apply",
        className: "page-view view-apply",
        template: e.template(r),
        events: {
            "click .js-apply-reset": "reset"
        },
        initialize: function() {
            this.model = new i,
            this.listenTo(this.model, "sync", this.render)
        },
        render: function() {
            if (1001 == this.model.get("code")) {
                s.html(this.$el.html(this.template()));
                var t = e.template(o);
                $("#content", this.$el).html(t(this.model.get("data")))
            } else {
                if (1003 == this.model.get("code") && ("" == _global.member.name || null == _global.member.name)) return window.location.href = _global.shop_url + "outlet/oauth/?redirect_uri=" + _global.shop_url + "outlet",
                !1;
                s.html(this.$el.html(this.template()));
                var i = new n({
                    model: this.model
                });
                $("#content", this.$el).html(i.render().$el)
            }
            return $(".loading").hide(),
            this
        },
        reset: function() {
            this.model.set("code", 1003);
            var t = new n({
                model: this.model
            });
            $("#content", this.$el).html(t.render().$el)
        }
    })
}),
function(t) {
    if ("object" == typeof exports) module.exports = t(require("underscore"), require("backbone"));
    else if ("function" == typeof define && define.amd) define("backbone.paginator", ["underscore", "backbone"], t);
    else if ("undefined" != typeof _ && "undefined" != typeof Backbone) {
        var e = Backbone.PageableCollection,
        i = t(_, Backbone);
        Backbone.PageableCollection.noConflict = function() {
            return Backbone.PageableCollection = e,
            i
        }
    }
} (function(t, e) {
    "use strict";
    function i(e, i) {
        if (!t.isNumber(e) || t.isNaN(e) || !t.isFinite(e) || ~~e !== e) throw new TypeError("`" + i + "` must be a finite integer");
        return e
    }
    function n(t) {
        for (var e, i, n, r, o = {},
        s = decodeURIComponent,
        a = t.split("&"), l = 0, h = a.length; h > l; l++) {
            var c = a[l];
            e = c.split("="),
            i = e[0],
            n = e[1] || !0,
            i = s(i),
            n = s(n),
            r = o[i],
            f(r) ? r.push(n) : o[i] = r ? [r, n] : n
        }
        return o
    }
    function r(t, e, i) {
        var n = t._events[e];
        if (n && n.length) {
            var r = n[n.length - 1],
            o = r.callback;
            r.callback = function() {
                try {
                    o.apply(this, arguments),
                    i()
                } catch(t) {
                    throw t
                } finally {
                    r.callback = o
                }
            }
        } else i()
    }
    var o = t.extend,
    s = t.omit,
    a = t.clone,
    l = t.each,
    h = t.pick,
    c = t.contains,
    d = t.isEmpty,
    u = t.pairs,
    p = t.invert,
    f = t.isArray,
    g = t.isFunction,
    m = t.isObject,
    _ = t.keys,
    y = t.isUndefined,
    v = Math.ceil,
    b = Math.floor,
    x = Math.max,
    T = e.Collection.prototype,
    w = /[\s'"]/g,
    S = /[<>\s'"]/g,
    C = e.PageableCollection = e.Collection.extend({
        state: {
            firstPage: 1,
            lastPage: null,
            currentPage: null,
            pageSize: 25,
            totalPages: null,
            totalRecords: null,
            sortKey: null,
            order: -1
        },
        mode: "server",
        queryParams: {
            currentPage: "page",
            pageSize: "per_page",
            totalPages: "total_pages",
            totalRecords: "total_entries",
            sortKey: "sort_by",
            order: "order",
            directions: {
                "-1": "asc",
                1 : "desc"
            }
        },
        constructor: function(t, e) {
            T.constructor.apply(this, arguments),
            e = e || {};
            var i = this.mode = e.mode || this.mode || k.mode,
            n = o({},
            k.queryParams, this.queryParams, e.queryParams || {});
            n.directions = o({},
            k.queryParams.directions, this.queryParams.directions, n.directions || {}),
            this.queryParams = n;
            var r = this.state = o({},
            k.state, this.state, e.state || {});
            r.currentPage = null == r.currentPage ? r.firstPage: r.currentPage,
            f(t) || (t = t ? [t] : []),
            t = t.slice(),
            "server" == i || null != r.totalRecords || d(t) || (r.totalRecords = t.length),
            this.switchMode(i, o({
                fetch: !1,
                resetState: !1,
                models: t
            },
            e));
            var s = e.comparator;
            if (r.sortKey && !s && this.setSorting(r.sortKey, r.order, e), "server" != i) {
                var l = this.fullCollection;
                s && e.full && (this.comparator = null, l.comparator = s),
                e.full && l.sort(),
                t && !d(t) && (this.reset(t, o({
                    silent: !0
                },
                e)), this.getPage(r.currentPage), t.splice.apply(t, [0, t.length].concat(this.models)))
            }
            this._initState = a(this.state)
        },
        _makeFullCollection: function(t, i) {
            var n, r, o, s = ["url", "model", "sync", "comparator"],
            a = this.constructor.prototype,
            l = {};
            for (n = 0, r = s.length; r > n; n++) o = s[n],
            y(a[o]) || (l[o] = a[o]);
            var h = new(e.Collection.extend(l))(t, i);
            for (n = 0, r = s.length; r > n; n++) o = s[n],
            this[o] !== a[o] && (h[o] = this[o]);
            return h
        },
        _makeCollectionEventHandler: function(t, e) {
            return function(i, n, s, h) {
                var c = t._handlers;
                l(_(c),
                function(i) {
                    var n = c[i];
                    t.off(i, n),
                    e.off(i, n)
                });
                var d = a(t.state),
                u = d.firstPage,
                p = 0 === u ? d.currentPage: d.currentPage - 1,
                f = d.pageSize,
                g = p * f,
                m = g + f;
                if ("add" == i) {
                    var b, x, T, w, h = h || {};
                    if (s == e) x = e.indexOf(n),
                    x >= g && m > x && (w = t, b = T = x - g);
                    else {
                        b = t.indexOf(n),
                        x = g + b,
                        w = e;
                        var T = y(h.at) ? x: h.at + g
                    }
                    if (h.onRemove || (++d.totalRecords, delete h.onRemove), t.state = t._checkState(d), w) {
                        w.add(n, o({},
                        h || {},
                        {
                            at: T
                        }));
                        var S = b >= f ? n: !y(h.at) && m > T && t.length > f ? t.at(f) : null;
                        S && r(s, i,
                        function() {
                            t.remove(S, {
                                onAdd: !0
                            })
                        })
                    }
                }
                if ("remove" == i) if (h.onAdd) delete h.onAdd;
                else {
                    if (--d.totalRecords) {
                        var C = d.totalPages = v(d.totalRecords / f);
                        d.lastPage = 0 === u ? C - 1 : C || u,
                        d.currentPage > C && (d.currentPage = d.lastPage)
                    } else d.totalRecords = null,
                    d.totalPages = null;
                    t.state = t._checkState(d);
                    var k, E = h.index;
                    s == t ? ((k = e.at(m)) ? r(t, i,
                    function() {
                        t.push(k, {
                            onRemove: !0
                        })
                    }) : !t.length && d.totalRecords && t.reset(e.models.slice(g - f, m - f), o({},
                    h, {
                        parse: !1
                    })), e.remove(n)) : E >= g && m > E && ((k = e.at(m - 1)) && r(t, i,
                    function() {
                        t.push(k, {
                            onRemove: !0
                        })
                    }), t.remove(n), !t.length && d.totalRecords && t.reset(e.models.slice(g - f, m - f), o({},
                    h, {
                        parse: !1
                    })))
                }
                if ("reset" == i) if (h = s, s = n, s == t && null == h.from && null == h.to) {
                    var z = e.models.slice(0, g),
                    L = e.models.slice(g + t.models.length);
                    e.reset(z.concat(t.models).concat(L), h)
                } else s == e && ((d.totalRecords = e.models.length) || (d.totalRecords = null, d.totalPages = null), "client" == t.mode && (d.lastPage = d.currentPage = d.firstPage), t.state = t._checkState(d), t.reset(e.models.slice(g, m), o({},
                h, {
                    parse: !1
                })));
                "sort" == i && (h = s, s = n, s === e && t.reset(e.models.slice(g, m), o({},
                h, {
                    parse: !1
                }))),
                l(_(c),
                function(i) {
                    var n = c[i];
                    l([t, e],
                    function(t) {
                        t.on(i, n);
                        var e = t._events[i] || [];
                        e.unshift(e.pop())
                    })
                })
            }
        },
        _checkState: function(t) {
            var e = this.mode,
            n = this.links,
            r = t.totalRecords,
            o = t.pageSize,
            s = t.currentPage,
            a = t.firstPage,
            l = t.totalPages;
            if (null != r && null != o && null != s && null != a && ("infinite" == e ? n: !0)) {
                if (r = i(r, "totalRecords"), o = i(o, "pageSize"), s = i(s, "currentPage"), a = i(a, "firstPage"), 1 > o) throw new RangeError("`pageSize` must be >= 1");
                if (l = t.totalPages = v(r / o), 0 > a || a > 1) throw new RangeError("`firstPage must be 0 or 1`");
                if (t.lastPage = 0 === a ? x(0, l - 1) : l || a, "infinite" == e) {
                    if (!n[s + ""]) throw new RangeError("No link found for page " + s)
                } else if (a > s || l > 0 && (a ? s > l: s >= l)) throw new RangeError("`currentPage` must be firstPage <= currentPage " + (a ? ">": ">=") + " totalPages if " + a + "-based. Got " + s + ".")
            }
            return t
        },
        setPageSize: function(t, e) {
            t = i(t, "pageSize"),
            e = e || {
                first: !1
            };
            var n = this.state,
            r = v(n.totalRecords / t),
            a = r ? x(n.firstPage, b(r * n.currentPage / n.totalPages)) : n.firstPage;
            return n = this.state = this._checkState(o({},
            n, {
                pageSize: t,
                currentPage: e.first ? n.firstPage: a,
                totalPages: r
            })),
            this.getPage(n.currentPage, s(e, ["first"]))
        },
        switchMode: function(e, i) {
            if (!c(["server", "client", "infinite"], e)) throw new TypeError('`mode` must be one of "server", "client" or "infinite"');
            i = i || {
                fetch: !0,
                resetState: !0
            };
            var n = this.state = i.resetState ? a(this._initState) : this._checkState(o({},
            this.state));
            this.mode = e;
            var r, h = this,
            d = this.fullCollection,
            u = this._handlers = this._handlers || {};
            if ("server" == e || d)"server" == e && d && (l(_(u),
            function(t) {
                r = u[t],
                h.off(t, r),
                d.off(t, r)
            }), delete this._handlers, this._fullComparator = d.comparator, delete this.fullCollection);
            else {
                d = this._makeFullCollection(i.models || [], i),
                d.pageableCollection = this,
                this.fullCollection = d;
                var p = this._makeCollectionEventHandler(this, d);
                l(["add", "remove", "reset", "sort"],
                function(e) {
                    u[e] = r = t.bind(p, {},
                    e),
                    h.on(e, r),
                    d.on(e, r)
                }),
                d.comparator = this._fullComparator
            }
            if ("infinite" == e) for (var f = this.links = {},
            g = n.firstPage,
            m = v(n.totalRecords / n.pageSize), y = 0 === g ? x(0, m - 1) : m || g, b = n.firstPage; y >= b; b++) f[b] = this.url;
            else this.links && delete this.links;
            return i.fetch ? this.fetch(s(i, "fetch", "resetState")) : this
        },
        hasPreviousPage: function() {
            var t = this.state,
            e = t.currentPage;
            return "infinite" != this.mode ? e > t.firstPage: !!this.links[e - 1]
        },
        hasNextPage: function() {
            var t = this.state,
            e = this.state.currentPage;
            return "infinite" != this.mode ? e < t.lastPage: !!this.links[e + 1]
        },
        getFirstPage: function(t) {
            return this.getPage("first", t)
        },
        getPreviousPage: function(t) {
            return this.getPage("prev", t)
        },
        getNextPage: function(t) {
            return this.getPage("next", t)
        },
        getLastPage: function(t) {
            return this.getPage("last", t)
        },
        getPage: function(t, e) {
            var n = this.mode,
            r = this.fullCollection;
            e = e || {
                fetch: !1
            };
            var a = this.state,
            l = a.firstPage,
            h = a.currentPage,
            c = a.lastPage,
            u = a.pageSize,
            p = t;
            switch (t) {
            case "first":
                p = l;
                break;
            case "prev":
                p = h - 1;
                break;
            case "next":
                p = h + 1;
                break;
            case "last":
                p = c;
                break;
            default:
                p = i(t, "index")
            }
            this.state = this._checkState(o({},
            a, {
                currentPage: p
            })),
            e.from = h,
            e.to = p;
            var f = (0 === l ? p: p - 1) * u,
            g = r && r.length ? r.models.slice(f, f + u) : [];
            return "client" != n && ("infinite" != n || d(g)) || e.fetch ? ("infinite" == n && (e.url = this.links[p]), this.fetch(s(e, "fetch"))) : (this.reset(g, s(e, "fetch")), this)
        },
        getPageByOffset: function(t, e) {
            if (0 > t) throw new RangeError("`offset must be > 0`");
            t = i(t);
            var n = b(t / this.state.pageSize);
            return 0 !== this.state.firstPage && n++,
            n > this.state.lastPage && (n = this.state.lastPage),
            this.getPage(n, e)
        },
        sync: function(t, i, n) {
            var r = this;
            if ("infinite" == r.mode) {
                var s = n.success,
                a = r.state.currentPage;
                n.success = function(t, e, i) {
                    var l = r.links,
                    h = r.parseLinks(t, o({
                        xhr: i
                    },
                    n));
                    h.first && (l[r.state.firstPage] = h.first),
                    h.prev && (l[a - 1] = h.prev),
                    h.next && (l[a + 1] = h.next),
                    s && s(t, e, i)
                }
            }
            return (T.sync || e.sync).call(r, t, i, n)
        },
        parseLinks: function(t, e) {
            var i = {},
            n = e.xhr.getResponseHeader("Link");
            if (n) {
                var r = ["first", "prev", "next"];
                l(n.split(","),
                function(t) {
                    var e = t.split(";"),
                    n = e[0].replace(S, ""),
                    o = e.slice(1);
                    l(o,
                    function(t) {
                        var e = t.split("="),
                        o = e[0].replace(w, ""),
                        s = e[1].replace(w, "");
                        "rel" == o && c(r, s) && (i[s] = n)
                    })
                })
            }
            return i
        },
        parse: function(t, e) {
            var i = this.parseState(t, a(this.queryParams), a(this.state), e);
            return i && (this.state = this._checkState(o({},
            this.state, i))),
            this.parseRecords(t, e)
        },
        parseState: function(e, i, n) {
            if (e && 2 === e.length && m(e[0]) && f(e[1])) {
                var r = a(n),
                o = e[0];
                return l(u(s(i, "directions")),
                function(e) {
                    var i = e[0],
                    n = e[1],
                    s = o[n];
                    y(s) || t.isNull(s) || (r[i] = o[n])
                }),
                o.order && (r.order = 1 * p(i.directions)[o.order]),
                r
            }
        },
        parseRecords: function(t) {
            return t && 2 === t.length && m(t[0]) && f(t[1]) ? t[1] : t
        },
        fetch: function(t) {
            t = t || {};
            var e = this._checkState(this.state),
            i = this.mode;
            "infinite" != i || t.url || (t.url = this.links[e.currentPage]);
            var r = t.data || {},
            l = t.url || this.url || "";
            g(l) && (l = l.call(this));
            var c = l.indexOf("?"); - 1 != c && (o(r, n(l.slice(c + 1))), l = l.slice(0, c)),
            t.url = l,
            t.data = r;
            var d, p, f, m, v = "client" == this.mode ? h(this.queryParams, "sortKey", "order") : s(h(this.queryParams, _(k.queryParams)), "directions"),
            b = u(v),
            x = a(this);
            for (d = 0; d < b.length; d++) p = b[d],
            f = p[0],
            m = p[1],
            m = g(m) ? m.call(x) : m,
            null != e[f] && null != m && (r[m] = e[f]);
            if (e.sortKey && e.order) {
                var w = g(v.order) ? v.order.call(x) : v.order;
                r[w] = this.queryParams.directions[e.order + ""]
            } else e.sortKey || delete r[v.order];
            var S = u(s(this.queryParams, _(k.queryParams)));
            for (d = 0; d < S.length; d++) p = S[d],
            m = p[1],
            m = g(m) ? m.call(x) : m,
            null != m && (r[p[0]] = m);
            if ("server" != i) {
                var C = this,
                E = this.fullCollection,
                z = t.success;
                return t.success = function(e, n, r) {
                    r = r || {},
                    y(t.silent) ? delete r.silent: r.silent = t.silent;
                    var s = e.models;
                    "client" == i ? E.reset(s, r) : (E.add(s, o({
                        at: E.length
                    },
                    o(r, {
                        parse: !1
                    }))), C.trigger("reset", C, r)),
                    z && z(e, n, r)
                },
                T.fetch.call(this, o({},
                t, {
                    silent: !0
                }))
            }
            return T.fetch.call(this, t)
        },
        _makeComparator: function(t, e, i) {
            var n = this.state;
            return t = t || n.sortKey,
            e = e || n.order,
            t && e ? (i || (i = function(t, e) {
                return t.get(e)
            }),
            function(n, r) {
                var o, s = i(n, t),
                a = i(r, t);
                return 1 === e && (o = s, s = a, a = o),
                s === a ? 0 : a > s ? -1 : 1
            }) : void 0
        },
        setSorting: function(t, e, i) {
            var n = this.state;
            n.sortKey = t,
            n.order = e = e || n.order;
            var r = this.fullCollection,
            s = !1,
            a = !1;
            t || (s = a = !0);
            var l = this.mode;
            i = o({
                side: "client" == l ? l: "server",
                full: !0
            },
            i);
            var h = this._makeComparator(t, e, i.sortValue),
            c = i.full,
            d = i.side;
            return "client" == d ? c ? (r && (r.comparator = h), s = !0) : (this.comparator = h, a = !0) : "server" != d || c || (this.comparator = h),
            s && (this.comparator = null),
            a && r && (r.comparator = null),
            this
        }
    }),
    k = C.prototype;
    return C
}),
define("apps/newoutlet/models/earn", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "outlet_icome_info"
        }
    })
}),
define("apps/newoutlet/collections/earn", ["backbone.paginator", "apps/newoutlet/models/earn"],
function(t, e) {
    return Backbone.PageableCollection.extend({
        model: e,
        url: _global.url.api + "outlet_icome_list",
        state: {
            pagesInRange: 0,
            pageSize: 10,
            sortKey: "dt_add",
            order: 1
        },
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: "limit",
            offset: function() {
                return (this.state.currentPage - 1) * this.state.pageSize
            },
            sort: "id",
            distributor_id: _global.did
        },
        parseState: function(t) {
            return {
                totalRecords: t._count,
                total_cash: t.total_cash,
                dlevel1_count: t.dlevel1_count,
                dlevel2_count: t.dlevel2_count,
                dlevel3_count: t.dlevel3_count
            }
        },
        parseRecords: function(t) {
            return t.data
        }
    })
}),
define("apps/newoutlet/models/earn_info", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "outlet_icome_info?order_id=" + this.get("order_id") + "&level=" + this.get("level")
        }
    })
}),
define("text!apps/newoutlet/templates/earn_item.html", [],
function() {
    return '<div class="earn-info clearfix js-earn-info">\r\n    <div class="left">\r\n        <div class="earn-date">{{=it.dt_add}}</div>\r\n        <div class="earn-id">\r\n            {{?it.dlevel==\'1\'}}\r\n            一级订单：\r\n            {{??it.dlevel==\'2\'}}\r\n            二级订单：\r\n            {{??it.dlevel==\'3\'}}\r\n            三级订单：\r\n            {{?}}\r\n            {{=it.order_sn}}</div>\r\n    </div>\r\n    <div class="right">\r\n        {{if(it.income_status==-1){}}\r\n            {{?it.order_status_name==\'退款完成\'||it.order_status_name==\'已取消\'}}\r\n            <p class="price tlt t_right">+{{=it.commission}}</p>\r\n            {{??}}\r\n            <p class="price t_right">+{{=it.commission}}</p>\r\n            {{?}}\r\n            <div class="status gray">{{=it.order_status_name}}</div>\r\n        {{}else if(it.income_status==0){}}\r\n        <p class="price">+{{=it.commission}}</p>\r\n            {{?it.order_status_name==\'待付款\'||it.order_status_name==\'退款中\'}}\r\n            <div class="status red">{{=it.order_status_name}}</div>\r\n            {{??}}\r\n            <div class="status green">{{=it.order_status_name}}</div>\r\n            {{?}}\r\n        {{}else if(it.income_status==1){}}\r\n        <p class="price t_right">+{{=it.commission}}</p>\r\n        <div class="status gray">{{=it.order_status_name}}</div>\r\n        {{}}}\r\n    </div>\r\n</div>'
}),
define("text!apps/newoutlet/templates/earn_info.html", [],
function() {
    return '<div class="order-detail">\r\n    {{?(_global.shop.stype == \'1\')}}\r\n    <div class="outlet-info">\r\n        <div><span>分销商：</span>{{=it.name}}（{{=it.mobile}}）</div>\r\n    </div>\r\n    {{?}}\r\n    <dl class="goods-list">\r\n        {{for(var i in it.goodses){}}\r\n        <dd class="clearfix">\r\n            <a href="{{=_global.shop_url}}goods/{{=it.goodses[i].goods_id}}">\r\n            <div class="goods-image"><img src="{{=it.goodses[i].img}}" alt=""></div>\r\n            <div class="goods-name">{{=it.goodses[i].title}}</div>\r\n            <div class="goods-price">\r\n                <span>X{{=it.goodses[i].quantity}}</span>\r\n                {{if(it.goodses[i].refund == 1){}}\r\n                <span class="gray tlt">+{{=it.goodses[i].income}}</span>\r\n                {{}else{}}\r\n                <span class="gray">+{{=it.goodses[i].income}}</span>\r\n                {{}}}\r\n            </div>\r\n            </a>\r\n        </dd>\r\n        {{}}}\r\n    </dl>\r\n    <div class="address">\r\n    <div><span>客户名：</span>{{=it.member_name}}</div>\r\n    {{if(it.shipping.type == 1){}}\r\n    <div><span>收货人：</span>{{=it.consignee}}（{{=it.phone}}）</div>\r\n    <div><span>收货地址：</span>{{=it.province.name}}{{=it.city.name}}{{=it.district.name||\'\'}}***</div>\r\n    {{}else{}}\r\n    {{?(typeof(it.shipping.name) != \'undefined\')}}<div><span>配送方式：</span>{{=it.shipping.name}}　{{=it.consignee}}（{{=it.phone}}）</div>{{?}}\r\n    {{}}}\r\n    {{?(it.logis_no != \'\' && it.logis_no != null)}}\r\n        <a style="color: #0081c4;" href="{{=_global.my_url}}logistics/{{=it.order_id}}">查看物流</a>\r\n    {{?}}\r\n    </div>\r\n</div>'
}),
define("apps/newoutlet/views/earn_item", ["backbone", "doT", "apps/newoutlet/models/earn_info", "text!apps/newoutlet/templates/earn_item.html", "text!apps/newoutlet/templates/earn_info.html"],
function(t, e, i, n, r) {
    return t.View.extend({
        className: "panel",
        tagName: "li",
        template: e.template(n),
        events: {
            "click .js-earn-info": "info"
        },
        initialize: function() {
            this.listenTo(this.model, "sync", this.render)
        },
        render: function() {
            return this.$el.html(this.template(this.model.toJSON())),
            this
        },
        renderInfo: function() {
            if (this.$el.hasClass("on")) this.$el.removeClass("on"),
            this.$el.children("div.order-detail").remove();
            else {
                $(".panel").removeClass("on"),
                $(".panel").find("div.order-detail").remove(),
                this.$el.addClass("on");
                var t = e.template(r);
                this.$el.append(t(this.infoModel.get("data")))
            }
        },
        info: function() {
            this.infoModel = new i,
            this.listenTo(this.infoModel, "sync", this.renderInfo),
            this.infoModel.set({
                order_id: this.model.get("order_id"),
                level: this.model.get("dlevel")
            }),
            this.infoModel.fetch()
        }
    })
}),
define("text!components/pager/templates/default.html", [],
function() {
    return '<ul class="pagination pull-right">\n    <li class="total">\n        当前 {{= (it.currentPage-1)*it.pageSize+1 }}-{{= it.totalRecords > (it.currentPage*it.pageSize) ? it.currentPage*it.pageSize : it.totalRecords }} 条\n        共 {{= it.totalRecords }} 条\n    </li>\n    {{ if ((it.firstPage != it.currentPage) && (it.currentPage - it.pagesInRange) > it.firstPage) { }}\n    <li><a href="#" data-page="1">{{= it.firstPage }}</a></li>\n    <li><span>···</span></li>\n    {{ } }}\n\n    {{~ it.pageSet:p:i }}\n    {{ if (it.currentPage == p) { }}\n    <li class="active"><span>{{= p }}</span></li>\n    {{ }else{ }}\n    <li><a href="#" data-page="{{= p }}">{{= p }}</a></li>\n    {{ } }}\n    {{~}}\n\n    {{ if ((it.lastPage != it.currentPage) && ((it.currentPage + it.pagesInRange) < it.lastPage)) { }}\n    <li><span>···</span></li>\n    <li><a href="#" data-page="{{= it.lastPage }}">{{= it.lastPage }}</a></li>\n    {{ } }}\n    {{ if(it.pageSet.length > 0){ }}\n    <li class="jump">\n        <input type="text" class="form-control input-sm" value="{{= it.currentPage+1 }}">\n        <button class="btn btn-default btn-sm" type="button">跳转</button>\n    </li>\n    {{ } }}\n</ul>'
}),
define("components/pager/main", ["require", "backbone", "doT", "text!components/pager/templates/default.html"],
function(t) {
    var e = t("backbone"),
    i = t("doT"),
    n = t("text!components/pager/templates/default.html");
    return e.View.extend({
        events: {
            "click a": "gotoPage",
            "click .jump button": "jumpPage"
        },
        tagName: "aside",
        template: i.template(n),
        render: function() {
            var t = this.collection.state;
            return t.totalPages > 0 && (t.pageSet = this.setPagination(t), this.$el.html(this.template(t))),
            this
        },
        gotoPage: function(t) {
            t.preventDefault();
            var e = parseInt($(t.target).attr("data-page"));
            this.collection.getPage(e, {
                reset: !0
            })
        },
        jumpPage: function(t) {
            t.preventDefault();
            var e = $(t.target).prev("input"),
            i = parseInt(e.val());
            i > 0 && i <= this.collection.state.lastPage ? this.collection.getPage(i, {
                reset: !0
            }) : e.select()
        },
        setPagination: function(t) {
            var e = [],
            i = 0,
            n = 0,
            r = 2 * t.pagesInRange,
            o = Math.ceil(t.totalRecords / t.pageSize);
            if (o > 1) if (1 + r >= o) for (i = 1, n = o; n >= i; i++) e.push(i);
            else if (t.currentPage <= t.pagesInRange + 1) for (i = 1, n = 2 + r; n > i; i++) e.push(i);
            else if (o - t.pagesInRange > t.currentPage && t.currentPage > t.pagesInRange) for (i = t.currentPage - t.pagesInRange; i <= t.currentPage + t.pagesInRange; i++) e.push(i);
            else for (i = o - r; o >= i; i++) e.push(i);
            return e
        }
    })
}),
define("text!apps/newoutlet/templates/order.html", [],
function() {
    return '<header class="top-tab">\r\n    <ul class="clearfix">\r\n        <li class="on js-order-tab" data-status="all"><a>所有订单</a></li>\r\n        <li class="js-order-tab" data-status="{{=_global.order_status_value.order_accepted}}"><a>已付款</a></li>\r\n        <li class="js-order-tab" data-status="{{=_global.order_status_value.order_pending}}"><a>待付款</a></li>\r\n        <li class="js-order-tab" data-status="{{=_global.order_status_value.order_finished}}"><a>已完成</a></li>\r\n    </ul>\r\n</header>\r\n<div class="js-count"></div>\r\n<div class="earn-list">\r\n    <ul class="js-order-cate">\r\n    </ul>\r\n</div>\r\n'
}),
define("text!apps/newoutlet/templates/list_empty.html", [],
function() {
    return '<div class="list-empty">\r\n    <i class="iconfont">&#xe610</i>\r\n    <p>{{=it.info}}</p>\r\n</div>'
}),
define("apps/newoutlet/views/order", ["backbone", "doT", "apps/newoutlet/collections/earn", "apps/newoutlet/views/earn_item", "components/pager/main", "text!apps/newoutlet/templates/order.html", "text!apps/newoutlet/templates/list_empty.html"],
function(t, e, i, n, r, o, s) {
    var a = $("#views");
    return t.View.extend({
        id: "view-center",
        className: "page-view page-o-oreder",
        template: e.template(o),
        events: {
            "click .js-order-tab": "orderTab"
        },
        initialize: function() {
            this.listCollection = new i,
            this.listCollection.on("sync", this.renderList, this)
        },
        render: function() {
            return a.html(this.$el.html(this.template)),
            this.listCollection.fetch(),
            this
        },
        renderList: function() {
            if (0 == this.listCollection.state.totalRecords) {
                var t = e.template(s);
                $(".js-order-cate", this.$el).html(t({
                    info: "亲，您暂无分销订单信息！"
                })),
                $(".js-count", this.$el).html("")
            } else {
                var i = "";
                null == this.listCollection.queryParams.status && (i += "，分销总收入<span>" + this.listCollection.state.total_cash + "</span>");
                var n = '<div class="count-text">共找到<span>' + this.listCollection.state.totalRecords + "</span>笔订单" + i + "<p>一级<span>" + this.listCollection.state.dlevel1_count + "</span>笔，二级<span>" + this.listCollection.state.dlevel2_count + "</span>笔，三级<span>" + this.listCollection.state.dlevel3_count + "</span>笔。</p></div>";
                $(".js-count", this.$el).html(n),
                this.listCollection.each(this.renderItem, this),
                this.bottomLoad()
            }
            $(".loading").hide()
        },
        renderItem: function(t) {
            $(".js-order-cate", this.$el).append(new n({
                model: t
            }).render().$el)
        },
        orderTab: function(t) {
            $(window).off("scroll");
            var e = $(t.currentTarget).attr("data-status");
            $(t.currentTarget).addClass("on"),
            $(t.currentTarget).siblings().removeClass("on"),
            this.listCollection.state.currentPage = 1,
            this.listCollection.queryParams.status = "all" != e ? e: null,
            $(".js-order-cate", this.$el).html(""),
            this.listCollection.fetch()
        },
        bottomLoad: function() {
            var t = this;
            $(window).on("scroll",
            function() {
                var e = $(this).scrollTop(),
                i = $(document).height(),
                n = $(this).height();
                e + n == i && t.listCollection.hasNextPage() && ($(".loading").show(), t.listCollection.getNextPage({
                    reset: !0
                }))
            })
        }
    })
}),
define("apps/newoutlet/models/team_apply", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "outlet_distributor"
        }
    })
}),
define("apps/newoutlet/collections/teams_apply", ["backbone.paginator", "apps/newoutlet/models/team_apply"],
function(t, e) {
    return Backbone.PageableCollection.extend({
        model: e,
        url: _global.url.api + "outlet_distributors",
        state: {
            pagesInRange: 0,
            pageSize: 2,
            sortKey: "dt_add",
            order: 1
        },
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: "limit",
            currentPage: null,
            offset: function() {
                return (this.state.currentPage - 1) * this.state.pageSize
            },
            shop_id: _global.shop.id,
            parent_id: _global.did,
            audit_status: 0,
            action: "apply"
        },
        parseState: function(t) {
            return {
                totalRecords: t._count,
                audit_type: t.audit_type
            }
        },
        parseRecords: function(t) {
            return t.data
        }
    })
}),
define("apps/newoutlet/models/team", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "distributors"
        }
    })
}),
define("apps/newoutlet/collections/teams", ["backbone.paginator", "apps/newoutlet/models/team"],
function(t, e) {
    return Backbone.PageableCollection.extend({
        model: e,
        url: _global.url.api + "outlet/distributors",
        state: {
            pagesInRange: 0,
            pageSize: 15,
            sortKey: "dt_add",
            order: 1
        },
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: "limit",
            currentPage: null,
            offset: function() {
                return (this.state.currentPage - 1) * this.state.pageSize
            },
            id: _global.did,
            shop_id: _global.shop.id
        },
        parseState: function(t) {
            return {
                totalRecords: t.data._count,
                outletLimit: t.data.c_surplus_distributor
            }
        },
        parseRecords: function(t) {
            return t.data.data
        }
    })
}),
define("apps/newoutlet/collections/members", ["backbone.paginator", "apps/newoutlet/models/team"],
function(t, e) {
    return Backbone.PageableCollection.extend({
        model: e,
        url: _global.url.api + "outlet_distributor_members",
        state: {
            pagesInRange: 0,
            pageSize: 16,
            sortKey: "dt_add",
            order: 1
        },
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: "limit",
            currentPage: null,
            offset: function() {
                return (this.state.currentPage - 1) * this.state.pageSize
            },
            did: _global.did
        },
        parseState: function(t) {
            return {
                totalRecords: t.data._count,
                outletLimit: t.data.c_surplus_distributor
            }
        },
        parseRecords: function(t) {
            return t.data.data
        }
    })
}),
define("text!apps/newoutlet/templates/team_apply_item.html", [],
function() {
    return '{{if(it.avatar == null || it.avatar == ""){}}<img src="{{=_global.url.base}}assets/img/wap/outlet/default_head_img.jpg">{{}else{}}<img src="{{=it.avatar}}">{{}}}\r\n<div class="info">\r\n    <p class="f15 mb5">{{=it.name}}<span class="phone">{{=it.mobile}}</span></p>\r\n    <p class="tint-gray f12">请求成为您的下级分销商</p>\r\n</div>\r\n<div class="group-btns clearfix">\r\n    <a data-did="{{=it.id}}" class="btn btn-warning js-accept"><span><i class="iconfont">&#xe60b</i> 接受请求</span></a>\r\n    <a data-did="{{=it.id}}" class="btn btn-fail js-refuse"><span><i class="iconfont">&#xe60c</i> 拒绝请求</span></a>\r\n</div>'
}),
define("apps/newoutlet/views/team_apply_item", ["backbone", "doT", "text!apps/newoutlet/templates/team_apply_item.html"],
function(t, e, i) {
    return t.View.extend({
        className: "item apply-list",
        template: e.template(i),
        events: {
            "click .js-accept": "accept",
            "click .js-refuse": "refuse"
        },
        initialize: function() {
            this.listenTo(this.model, "sync", this.render)
        },
        render: function() {
            return this.$el.html(this.template(this.model.toJSON())),
            this.delegateEvents(),
            this
        },
        accept: function() {
            this.undelegateEvents();
            var t = (this.model.get("id"), this);
            this.model.set("audit_status", 1),
            this.model.save("", "", {
                success: function() {
                    t.trigger("change")
                }
            })
        },
        refuse: function() {
            this.undelegateEvents();
            var t = (this.model.get("id"), this);
            this.model.set("audit_status", 2),
            this.model.save("", "", {
                success: function() {
                    t.trigger("change")
                }
            })
        }
    })
}),
define("text!apps/newoutlet/templates/team_apply_list.html", [],
function() {
    return '{{if(it.length > 0){}}\r\n<div class="layout-full">\r\n    <div class="hd">\r\n        <h3 class="f14">待审核（<span class="red">{{=it.length}}</span>）</h3>\r\n    </div>\r\n    <div class="bd" style="padding: 0;">\r\n        <div class="js-team-list" style="padding: 0;"></div>\r\n        {{if(it.length > it.limit){}}\r\n        <a class="btn gray js-search-all">查看所有申请</a>\r\n        {{}}}\r\n    </div>\r\n    <div class="pager"></div>\r\n</div>\r\n{{}}}\r\n'
}),
define("apps/newoutlet/views/team_apply_list", ["backbone", "doT", "apps/newoutlet/views/team_apply_item", "text!apps/newoutlet/templates/team_apply_list.html"],
function(t, e, i, n) {
    return t.View.extend({
        el: ".js-team-apply",
        template: e.template(n),
        events: {
            "click .js-search-all": "searchAll"
        },
        initialize: function() {},
        render: function() {
            return "2" != this.collection.state.audit_type && (this.$el.html(this.template({
                length: this.collection.state.totalRecords,
                limit: this.collection.state.pageSize
            })), this.collection.each(this.renderItem, this)),
            this
        },
        renderItem: function(t) {
            this.itemView = new i({
                model: t
            });
            var e = this;
            $(".js-team-list", this.$el).append(this.itemView.render().$el),
            this.itemView.on("change",
            function() {
                $(".js-team-list").html(""),
                e.collection.fetch({
                    reset: !0
                })
            })
        },
        searchAll: function() {
            this.collection.state.pageSize = null;
            var t = this;
            this.collection.fetch({
                success: function() {
                    t.render(),
                    $(".js-search-all", this.$el).remove()
                }
            })
        }
    })
}),
define("text!apps/newoutlet/templates/team_item.html", [],
function() {
    return '{{if(it.avatar == null || it.avatar == ""){}}<img src="{{=_global.url.base}}assets/img/wap/outlet/default_head_img.jpg">{{}else{}}<img src="{{=it.avatar}}">{{}}}\r\n<div class="info">\r\n    <p class="f15 mb5 clearfix"><span class="left">{{=it.name}}</span><span class="right f14" style="margin-right: 10px;">{{=it.mobile}}</span></p>\r\n    <p class="tint-gray f12">{{=it.dt_add}}</p>\r\n    <!--<p class="tint-gray f12">{{=it.csub}}个下级分销商</p>-->\r\n</div>\r\n<div class="earning">\r\n    {{if(_global.shop.stype == \'1\'){}}\r\n    <p class="f16 mb5">＋{{=it.total_commission}}</p>\r\n    <!--<p class="tint-gray f12">总收入贡献</p>-->\r\n    <p class="tint-gray f12"><span class="red">{{=it.sub_number}}</span> 个成员</p>\r\n    {{}else if(_global.shop.stype == \'2\'){}}\r\n    <p class="f16 mb5">＋{{=it.amount}}</p>\r\n    <p class="tint-gray f12">{{=it.num}} 笔订单</p>\r\n    {{}}}\r\n</div>'
}),
define("apps/newoutlet/views/team_item", ["backbone", "doT", "text!apps/newoutlet/templates/team_item.html"],
function(t, e, i) {
    return t.View.extend({
        className: "item team-list",
        template: e.template(i),
        events: {},
        initialize: function() {
            this.listenTo(this.model, "sync", this.render)
        },
        render: function() {
            return this.$el.html(this.template(this.model.toJSON())),
            this.delegateEvents(),
            this
        }
    })
}),
define("text!apps/newoutlet/templates/team_list.html", [],
function() {
    return '<div class="hd">\r\n    {{if(_global.shop.stype == \'1\'){}}\r\n    <h3 class="f14">团队成员（<span class="red">{{=it.length}}</span>）</h3>\r\n    {{}else if(_global.shop.stype == \'2\'){}}\r\n    <h3 class="f14">我的客户（<span class="red">{{=it.length}}</span>）</h3>\r\n    {{}}}\r\n    {{?(_global.shop.stype == \'1\')}}\r\n    {{if(it.limit != 0){}}\r\n    <span class="right-remark">还可发展<span class="green">{{=it.limit}}</span>名下级分销商</span>\r\n    {{}}}\r\n    {{?}}\r\n</div>\r\n<div class="bd js-team-list" style="padding: 0;"></div>'
}),
define("apps/newoutlet/views/team_list", ["backbone", "doT", "apps/newoutlet/views/team_item", "text!apps/newoutlet/templates/team_list.html", "text!apps/newoutlet/templates/list_empty.html"],
function(t, e, i, n, r) {
    return t.View.extend({
        el: ".js-team",
        template: e.template(n),
        events: {},
        initialize: function() {
            this.collection.on("reset", this.renderEach, this)
        },
        render: function() {
            if (0 != this.collection.length) this.$el.html(this.template({
                length: this.collection.state.totalRecords,
                limit: this.collection.state.outletLimit
            })),
            this.collection.each(this.renderItem, this),
            this.bottomLoad();
            else {
                var t = e.template(r);
                this.$el.html(t({
                    info: "您还没有分销团队，加油发展吧！"
                }))
            }
            return this
        },
        renderItem: function(t) {
            $(".js-team-list", this.$el).append(new i({
                model: t
            }).render().$el),
            $(".loading").hide()
        },
        renderEach: function() {
            this.collection.each(this.renderItem, this)
        },
        bottomLoad: function() {
            var t = this;
            $(window).scroll(function() {
                var e = $(this).scrollTop(),
                i = $(document).height(),
                n = $(this).height();
                e >= i - n - 20 && t.collection.hasNextPage() && ($(".loading").show(), t.collection.getNextPage({
                    reset: !0
                }))
            })
        }
    })
}),
define("text!apps/newoutlet/templates/team.html", [],
function() {
    return '<div class="js-team-apply"></div>\r\n<div class="layout-full">\r\n    <div class="js-team"></div>\r\n    <div class="pager"></div>\r\n</div>'
}),
define("apps/newoutlet/views/team", ["backbone", "doT", "apps/newoutlet/collections/teams_apply", "apps/newoutlet/collections/teams", "apps/newoutlet/collections/members", "apps/newoutlet/views/team_apply_list", "apps/newoutlet/views/team_list", "components/pager/main", "text!apps/newoutlet/templates/team.html"],
function(t, e, i, n, r, o, s, a, l) {
    var h = $("#views");
    return t.View.extend({
        template: e.template(l),
        events: {},
        initialize: function() {
            this.applycollection = new i,
            "1" == _global.shop.stype ? this.teamcollection = new n: "2" == _global.shop.stype && (this.teamcollection = new r),
            this.applycollection.on("reset", this.renderApplyList, this),
            this.applycollection.on("reset",
            function() {
                this.teamcollection.fetch({
                    reset: !0
                })
            },
            this),
            this.teamcollection.once("reset", this.renderList, this)
        },
        render: function() {
            return h.html(this.$el.html(this.template())),
            this.applycollection.fetch({
                reset: !0
            }),
            this
        },
        renderApplyList: function() {
            {
                var t = new o({
                    collection: this.applycollection
                });
                new a({
                    collection: this.applycollection
                })
            }
            t.render()
        },
        renderList: function() {
            {
                var t = new s({
                    collection: this.teamcollection
                });
                new a({
                    collection: this.teamcollection
                })
            }
            t.render(),
            $(".loading").hide()
        }
    })
}),
define("apps/newoutlet/models/distributor", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            try {
                return 1 == this.id ? _global.url.api + "distributor_new?shop_id=" + _global.shop.id + "&type=1": _global.url.api + "distributor_new?shop_id=" + _global.shop.id
            } catch(t) {}
        }
    })
}),
define("apps/newoutlet/models/cash_info", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "outlet_cash_info?shop_id=" + _global.shop.id + "&did=" + _global.did
        }
    })
}),
define("text!apps/newoutlet/templates/cash_dialog.html", [],
function() {
    return '<div class="bg js-close-dialog"></div>\r\n<div class="body">\r\n    <div class="hd">\r\n        请输入提现信息\r\n        <div class="close js-close-dialog"><i class="iconfont">&#xe616</i></div>\r\n    </div>\r\n    <div class="bd">\r\n        <div class="from-control">\r\n            {{if(it.type == 0){}}\r\n            <div class="input-group">\r\n                <input class="text input" name="money" placeholder="请填写提现金额" value="{{=it.amount}}" />\r\n            </div>\r\n            <div class="input-group">\r\n                <input class="text input" name="name" placeholder="请填写您的姓名" {{?it.name}}value="{{=it.name}}"{{?}} />\r\n            </div>\r\n            <!--<div class="input-group">\r\n                <input class="text input" name="alipay_account" placeholder="请填写您的支付宝账号" {{?it.alipay_account}}value="{{=it.alipay_account}}"{{?}} />\r\n            </div>-->\r\n            <textarea name="alipay_account" placeholder="请填写您的支付宝账号或银行卡号（银行名称、开户行、卡号）" style="height: 88px;">{{?(typeof(it.alipay_account) != \'undefined\' && it.alipay_account != \'undefined\')}}{{=it.alipay_account}}{{?}}</textarea>\r\n            <p class="mb10"><i class="iconfont tint-gray js-remember-btn {{?it.name}}tint-green{{?}}">{{?it.name}}&#xe62f{{}else{}}&#xe62d{{?}}</i> 记住我的姓名和账号</p>\r\n            {{}else{}}\r\n            <div class="input-group">\r\n                <input class="text input" name="money" placeholder="请填写金额" value="{{=it.amount}}" />\r\n            </div>\r\n            {{}}}\r\n            <a class="btn btn-warning btn-big js-cash-apply-btn" style="margin: 0;">申请提现</a>\r\n        </div>\r\n    </div>\r\n</div>'
}),
define("apps/newoutlet/views/cash_dialog", ["backbone", "doT", "text!apps/newoutlet/templates/cash_dialog.html"],
function(Backbone, doT, Tpl) {
    return Backbone.View.extend({
        className: "pop-dialog",
        template: doT.template(Tpl),
        events: {
            "click .js-close-dialog": "dialogClose",
            "click .js-remember-btn": "rememberSelect",
            "click .js-cash-apply-btn": "apply"
        },
        initialize: function() {},
        render: function(type) {
            this.type = type;
            var amount = parseFloat($(".js-cach-amount").text()).toFixed(2),
            history = localStorage.getItem("Outlet_Alipay_History");
            if (null != history) {
                var objs = eval("(" + history + ")");
                this.$el.html(this.template({
                    type: this.type,
                    amount: amount,
                    name: objs.name,
                    alipay_account: objs.alipay_account
                }))
            } else this.$el.html(this.template({
                type: this.type,
                amount: amount
            }));
            return this
        },
        apply: function(t) {
            var e = {
                type: this.type,
                shop_id: _global.shop.id,
                distributor_id: _global.did,
                money: parseFloat($.trim($('input[name="money"]').val()))
            },
            i = this;
            if (e.money <= 0) return void alert("请填写正确金额");
            var n = _global.url.api + "outlet_cash_balance";
            if (0 == e.type) {
                if (e.name = $.trim($('input[name="name"]').val()), e.alipay_account = $.trim($('textarea[name="alipay_account"]').val()), "" == e.name) return void alert("请填写姓名");
                if ("" == e.alipay_account) return void alert("请填写支付宝账号");
                n = _global.url.api + "outlet_cash"
            }
            3 == e.type && (n = _global.url.api + "outlet_cash"),
            $(t.currentTarget).text("正在提交..."),
            this.undelegateEvents(),
            $.ajax({
                type: "POST",
                url: n,
                data: e,
                success: function(n) {
                    console.log(n),
                    $(".js-remember-btn").hasClass("tint-green") ? i.remember({
                        name: e.name,
                        alipay_account: e.alipay_account
                    }) : localStorage.removeItem("Outlet_Alipay_History"),
                    0 == n.status ? (alert(n.msg), $(t.currentTarget).text("提交"), i.delegateEvents()) : window.location.reload()
                }
            })
        },
        rememberSelect: function(t) {
            $(t.target).hasClass("tint-green") ? ($(t.target).removeClass("tint-green"), $(t.target).html("&#xe62d")) : ($(t.target).addClass("tint-green"), $(t.target).html("&#xe62f"))
        },
        remember: function(t) {
            var e = window.localStorage;
            e.setItem("Outlet_Alipay_History", JSON.stringify(t))
        },
        dialogClose: function() {
            $(".pop-dialog").remove()
        }
    })
}),
define("text!apps/newoutlet/templates/money.html", [],
function() {
    return '<a style="display: block;" href="/outlet#income">\r\n<header style="height:{{=document.body.clientWidth/2+\'px\'}}">\r\n    <div class="mark-text">可提佣金（元）</div>\r\n    <div class="amount-box clearfix">\r\n        <span class="amount js-cach-amount">{{=it.cash_amount||\'0.00\'}}</span><em class="more-link">查看明细</em>\r\n        <div class="handle-amount">成功提现：{{=it.mentioned_amount||\'0.00\'}}{{?it.handling_amount}}，处理中：{{=it.handling_amount}}元{{?}}</div>\r\n    </div>\r\n</header>\r\n</a>\r\n<section>\r\n    <ul class="list-col2 clearfix">\r\n        <li> <a href="/outlet#income"> <div class="gray f12">累计佣金</div> <div class="f24 black">{{=it.sales_commission||\'0.00\'}}</div> </a> </li>\r\n        <li> <a href="/outlet#income"> <div class="gray f12">未结算佣金</div> <div class="f24 black">{{=parseFloat(it.unsettlement_amount||\'0.00\').toFixed(2)}}</div> </a> </li>\r\n            </ul>\r\n    <div class="amount-mark-text">买家确认收货后，立即获得分销佣金。结算期（<span>{{=it.cash_day||\'7\'}}</span>天）后，佣金可提现。结算期内，买家退货，佣金将自动扣除。</div>\r\n</section>\r\n<section class="apply-box">\r\n    <button class="btn {{?it.status==\'true\'}}btn-warning js-cash-btn{{?}}">我要提现</button>\r\n    {{?it.cash_money>0}}<div class="cash-mark">提示：达到{{=it.cash_money}}元才能提现！</div>{{?}}\r\n</section>\r\n<div class="new-dialog js-select-cash" style="display: none">\r\n    <div class="bg" onclick="$(\'.js-select-cash\').hide()"></div>\r\n    <div class="body" style="margin-top: -37px;">\r\n        <p class="js-cash-balance">转到余额</p>\r\n        <p class="js-cash-account">提现到账户</p>\r\n    </div>\r\n</div>'
}),
define("apps/newoutlet/views/money", ["backbone", "doT", "apps/newoutlet/models/distributor", "apps/newoutlet/models/cash_info", "apps/newoutlet/views/cash_dialog", "text!apps/newoutlet/templates/money.html"],
function(t, e, i, n, r, o) {
    var s = $("#views");
    return t.View.extend({
        id: "view-center",
        className: "page-view page-o-amount",
        template: e.template(o),
        events: {
            "click .js-cash-btn": "cash",
            "click .js-cash-account": "cashAccount",
            "click .js-cash-balance": "cashBalance"
        },
        initialize: function() {
            var t = this;
            t.model = new i({
                id: 1
            }),
            t.listenTo(t.model, "sync",
            function() {
                t.cashmodel = new n,
                t.cashmodel.fetch(),
                t.listenTo(t.cashmodel, "sync", t.render)
            })
        },
        render: function() {
            var t = this.model.toJSON();
            return t.status = this.cashmodel.get("status"),
            s.html(this.$el.html(this.template(t))),
            $(".loading").hide(),
            this
        },
        cash: function() {
            $(".js-select-cash").show()
        },
        cashAccount: function() {
            this.cashDialog(0)
        },
        cashBalance: function() {
            this.cashDialog(1)
        },
        cashDialog: function(t) {
            $(".js-select-cash").hide();
            var e = new r({
                model: this.model
            }),
            i = this;
            $("body").append(e.render(t).$el),
            e.on("change",
            function() {
                i.model.fetch()
            })
        }
    })
}),
define("apps/newoutlet/models/outlet_customs", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "outlet_customs?shop_id=" + _global.shop.id
        }
    })
}),
define("apps/refund/models/paymentcert", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "payment/paymentcert/?shop_id=" + this.get("shop_id") + "&code=" + this.get("code") + "&is_peerpay=" + this.get("is_peerpay")
        }
    })
}),
define("text!apps/newoutlet/templates/center.html", [],
function() {
    return '{{var sec_height=document.body.clientWidth/3+\'px\';}}\r\n<div class="header">\r\n    <div class="head-img"><img src="{{=_global.member.avatar||\'/assets/img/wap/outlet/default_head_img.jpg\'}}" alt=""></div>\r\n    <div class="user-info">\r\n        <div class="user-name">{{=_global.member.name||\'\'}}{{?it.lv_count!=0}} <a href="#levels">{{=it.level_name||\'\'}}{{?}}</a> </div>\r\n        <div class="date-time">加入时间：{{=it.dt_add||\'\'}}{{?it.agree.data.is_agree==\'1\'}}<a class="orange js-agree">&lt;&lt;分销商协议&gt;&gt;</a>{{?}}</div>\r\n    </div>\r\n</div>\r\n<section class="outlet-info" style="height:{{=document.body.clientWidth/2+\'px\'}}">\r\n    <a class="block" href="/outlet#money"><div class="mark-text">累计佣金：{{=it.sales_commission||\'0.00\'}} 元<i class="right iconfont icon-jiantouyou"></i></div>\r\n    <div class="mark-text">可提佣金（元）</div>\r\n    </a>\r\n    <div class="amount-box clearfix"><span class="amount js-cach-amount">{{=it.cash_amount||\'0.00\'}}</span>\r\n        <a class="{{?it.status==\'true\'}}js-cash-btn{{??}}op5 js-cash-tip{{?}}">提现</a>\r\n    </div>\r\n</section>\r\n<section class="outlet-nav">\r\n    <ul class="clearfix">\r\n        <li style="height: {{=sec_height}}">\r\n            <a href="/outlet#profit">\r\n                <span class="iconfont icon-qiandaizi"></span>\r\n                <div class="title">收益统计</div>\r\n                <div class="desc"><span>{{=it.sales_commission||\'0.00\'}}</span>元</div>\r\n            </a>\r\n        </li>\r\n        <li  style="height: {{=sec_height}}">\r\n            <a href="/outlet#team">\r\n                <span class="iconfont icon-wodekehu"></span>\r\n                <div class="title">我的团队</div>\r\n                <div class="desc"><span>{{=it.sub_number||\'0\'}}</span>个伙伴</div>\r\n            </a>\r\n        </li>\r\n        <li  style="height: {{=sec_height}}">\r\n            <a href="/outlet#order">\r\n                <span class="iconfont icon-fenxiao"></span>\r\n                <div class="title">分销订单</div>\r\n                <div class="desc"><span>{{=it.corder||\'0\'}}</span>个订单</div>\r\n            </a>\r\n        </li>\r\n        <li  style="height: {{=sec_height}}">\r\n            <a href="{{=_global.shop_url}}ad_card/shop{{?_global.shop.stype==1}}?did={{=_global.did}}{{?}}">\r\n                <span class="iconfont icon-yemiantuiguang"></span>\r\n                <div class="title">二维码</div>\r\n                <div class="desc">推广二维码</div>\r\n            </a>\r\n        </li>\r\n        <li  style="height: {{=sec_height}}">\r\n            <a class="myinform" href="/outlet#inform">\r\n                <span class="iconfont icon-jikediancanicon17"></span>\r\n                <div class="title">我的通知</div>\r\n                <div class="desc"><span>{{=it.cnoti}}</span>条通知</div>\r\n            </a>\r\n        </li>\r\n        {{?it.is_ranking==\'1\'}}\r\n        <li style="height: {{=sec_height}}">\r\n        <a href="/outlet#ranks">\r\n        <span class="iconfont icon-icon2"></span>\r\n        <div class="title">英雄榜</div>\r\n        <div class="desc">实时佣金排行</div>\r\n        </a>\r\n        </li>\r\n        {{?}}\r\n        {{?it.material_enabled==\'1\'}}\r\n        <li  style="height: {{=sec_height}}">\r\n            <a href="/material">\r\n                <span class="iconfont icon-tuwenxiangqing"></span>\r\n                <div class="title">推广素材</div>\r\n                <div class="desc">分享转发素材</div>\r\n            </a>\r\n        </li>\r\n        {{?}}\r\n        {{~it.icons:menu:index}}\r\n        <li style="height: {{=sec_height}};">\r\n        <a href="{{=menu.url}}">\r\n        <span class="icon-menu"><img src="{{=menu.logo.img||\'/assets/img/wap/v2/member_my_favicon.jpg\'}}"/> </span>\r\n        <div class="title">{{=menu.name}}</div>\r\n        <div class="desc">{{=menu.description}}</div>\r\n        </a>\r\n        </li>\r\n        {{~}}\r\n    </ul>\r\n</section>\r\n<div class="new-dialog js-select-cash" style="display: none">\r\n    <div class="bg" onclick="$(\'.js-select-cash\').hide()"></div>\r\n    <div class="body" style="margin-top: -37px;">\r\n        <p class="js-cash-dialog" data-type="1">转到余额</p>\r\n        <p class="js-cash-dialog" data-type="0">提现到账户</p>\r\n        {{?(it.is_wxpay3)}}\r\n        <p class="js-cash-dialog" data-type="3">提现到微信钱包</p>\r\n        {{?}}\r\n    </div>\r\n</div>\r\n{{?(_global.shop.stype == \'1\' && it.show_nav)}}\r\n<footer id="footer-fixed-edit-1">\r\n    <ul class="menu-list">\r\n        <li>\r\n            <a href="{{=_global.shop_url}}?did={{=_global.did}}">\r\n                <i class="iconfont">&#xe615</i>\r\n                <span>微店</span>\r\n            </a>\r\n        </li>\r\n        <li class="active">\r\n            <a>\r\n                <i class="iconfont">&#xe619</i>\r\n                <span>分销中心</span>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="{{=_global.cart_url}}">\r\n                <i class="iconfont">&#xe624</i>\r\n                <span>购物车</span>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href="{{=_global.my_url}}">\r\n                <i class="iconfont">&#xe623</i>\r\n                <span>我的</span>\r\n            </a>\r\n        </li>\r\n    </ul>\r\n</footer>\r\n{{?}}\r\n{{?it.agree.data.is_agree==\'1\'}}\r\n<div class="agree-dialog js-agree-dialog" style="display:{{?it.agree.data.is_agreemented==1}}none{{?}}">\r\n    <div class="modal-container">\r\n        <div class="modal-header">\r\n            <h3>分销商协议</h3>\r\n        </div>\r\n        {{var sec_height=document.body.clientWidth+\'px\';}}\r\n        <div class="modal-body" style="height:{{=sec_height}};">\r\n            {{=it.agree.data.agreement_content||\'\'}}\r\n        </div>\r\n        <div class="modal-footer">\r\n            <a class="agree-btn js-agree-btn">我已阅读并同意协议</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n{{?}}'
}),
define("apps/newoutlet/views/center", ["backbone", "doT", "apps/newoutlet/models/distributor", "apps/newoutlet/models/cash_info", "apps/newoutlet/models/outlet_customs", "apps/refund/models/paymentcert", "apps/newoutlet/views/cash_dialog", "text!apps/newoutlet/templates/center.html"],
function(t, e, i, n, r, o, s, a) {
    var l = $("#views");
    return t.View.extend({
        id: "view-center",
        className: "page-view page-outlet",
        template: e.template(a),
        events: {
            "click .js-cash-btn": "cash",
            "click .js-cash-dialog": "cashDialogType",
            "click .js-cash-tip": "cashTip",
            "click .js-agree": "agree_show",
            "click .js-agree-btn": "agree_hide"
        },
        initialize: function(t) {
            this.options = t;
            var e = this;
            e.model = new i,
            e.listenTo(e.model, "sync",
            function() {
                e.cashmodel = new n,
                e.cashmodel.fetch(),
                e.listenTo(e.cashmodel, "sync",
                function() {
                    e.iconmodel = new r,
                    e.iconmodel.fetch(),
                    e.listenTo(e.iconmodel, "sync", e.render)
                })
            }),
            this.paymentModel = new o
        },
        render: function() {
            var t = this.model.toJSON();
            console.log(t),
            t.status = this.cashmodel.get("status"),
            t.icons = this.iconmodel.get("data"),
            t.agree = this.options,
            t.show_nav = this.getUrlParam("fromapp") ? !1 : !0;
            var e = this;
            return "undefined" != typeof t.cash_amount && parseFloat(t.cash_amount) > 1 ? (e.paymentModel.clear(), e.paymentModel.set({
                shop_id: _global.shop.id,
                code: "wxpay3",
                is_peerpay: 0
            }), e.paymentModel.fetch({
                success: function(i, n) {
                    n.status ? (t.is_wxpay3 = !0, console.log(t)) : t.is_wxpay3 = !1,
                    l.html(e.$el.html(e.template(t))),
                    $(".loading").hide()
                }
            })) : (t.is_wxpay3 = !1, l.html(e.$el.html(e.template(t))), $(".loading").hide()),
            this
        },
        agree_show: function() {
            $(".agree-dialog").show()
        },
        agree_hide: function() {
            var t = {
                id: _global.did,
                is_agreemented: 1
            };
            $.ajax({
                url: _global.url.api + "outlet_distributor",
                type: "PUT",
                data: t
            }),
            $(".agree-dialog").hide()
        },
        cashTip: function() {
            var t = this.model.get("cash_amount"),
            e = this.model.get("cash_money"),
            i = this.model.get("cash_limit");
            e > t ? Tips("error-tips", {
                content: "达到" + e + "元才能提现！"
            }) : Tips("error-tips", {
                content: "每月只能提现" + i + "次！"
            })
        },
        cash: function() {
            $(".js-select-cash").show()
        },
        cashDialogType: function(t) {
            this.cashDialog($(t.currentTarget).data("type"))
        },
        cashDialog: function(t) {
            $(".js-select-cash").hide();
            var e = new s({
                model: this.model
            }),
            i = this;
            $("body").append(e.render(t).$el),
            e.on("change",
            function() {
                i.model.fetch()
            })
        },
        getUrlParam: function(t) {
            var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"),
            i = window.location.search.substr(1).match(e);
            return null != i ? unescape(i[2]) : null
        }
    })
}),
define("apps/newoutlet/models/cash", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "outlet_cash"
        }
    })
}),
define("apps/newoutlet/collections/cash", ["backbone.paginator", "apps/newoutlet/models/cash"],
function(t, e) {
    return Backbone.PageableCollection.extend({
        model: e,
        url: _global.url.api + "outlet_cashes",
        state: {
            pagesInRange: 0,
            pageSize: 10,
            sortKey: "dt_add",
            order: 1
        },
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: "limit",
            currentPage: null,
            offset: function() {
                return (this.state.currentPage - 1) * this.state.pageSize
            },
            did: _global.did,
            shop_id: _global.shop.id
        },
        parseState: function(t) {
            return {
                totalRecords: t._count,
                cashed_money: t.cashed_money
            }
        },
        parseRecords: function(t) {
            return t.data
        }
    })
}),
define("text!apps/newoutlet/templates/cash_item.html", [],
function() {
    return '<div class="info">\r\n    {{if(it.type == 0){}}\r\n    <p class="f15 mb4">转入账户：{{=it.alipay_account}}</p>\r\n    {{}if(it.type == 3){}}\r\n    <p class="f15 mb4">转入微信钱包：{{=it.alipay_account}}</p>\r\n    {{} else{}}\r\n    <p class="f15 mb4">转入商城余额</p>\r\n    {{}}}\r\n    <p class="tint-gray f12">{{=it.dt_apply}}</p>\r\n</div>\r\n<div class="detail">\r\n    {{if(it.type == 0){}}\r\n        {{if(it.status == 0){}}\r\n            <p class="f15 mb4">{{=it.money}}</p>\r\n            <p class="deep-green f12 t_right">处理中</p>\r\n        {{}else if(it.status == 1){}}\r\n            <p class="f15 mb4">{{=it.money}}</p>\r\n            <p class="tint-gray f12 t_right">已打款</p>\r\n        {{}else if(it.status == 2){}}\r\n            <p class="f15 mb4 tint-gray t_lt">{{=it.money}}</p>\r\n            <p class="tint-gray f12 t_right">已取消</p>\r\n        {{}}}\r\n    {{}else{}}\r\n        {{if(it.status == 0){}}\r\n            <p class="f15 mb4">{{=it.money}}</p>\r\n            <p class="deep-green f12 t_right">处理中</p>\r\n        {{}else if(it.status == 1){}}\r\n            <p class="f15 mb4">{{=it.money}}</p>\r\n            <p class="tint-gray f12 t_right">已转入余额</p>\r\n        {{}else if(it.status == 2){}}\r\n            <p class="f15 mb4 tint-gray t_lt">{{=it.money}}</p>\r\n            <p class="tint-gray f12 t_right">已取消</p>\r\n        {{}}}\r\n    {{}}}\r\n</div>'
}),
define("apps/newoutlet/views/cash_item", ["backbone", "doT", "text!apps/newoutlet/templates/cash_item.html"],
function(t, e, i) {
    return t.View.extend({
        className: "item cash-list",
        template: e.template(i),
        events: {},
        initialize: function() {
            this.listenTo(this.model, "sync", this.render)
        },
        render: function() {
            return this.$el.html(this.template(this.model.toJSON())),
            this
        }
    })
}),
define("text!apps/newoutlet/templates/cash.html", [],
function() {
    return '<header class="top-tab">\r\n    <ul class="clearfix">\r\n        <li><a href="/outlet#income">佣金</a></li>\r\n        <li class="on"><a href="/outlet#cash">提现</a></li>\r\n    </ul>\r\n</header>\r\n<div class="js-count"></div>\r\n<div class="bd js-cash-list" style="padding: 0;"></div>'
}),
define("apps/newoutlet/views/cash", ["backbone", "doT", "apps/newoutlet/collections/cash", "apps/newoutlet/views/cash_item", "text!apps/newoutlet/templates/cash.html", "text!apps/newoutlet/templates/list_empty.html"],
function(t, e, i, n, r, o) {
    var s = $("#views");
    return t.View.extend({
        template: e.template(r),
        className: "page-view page-cash",
        events: {},
        initialize: function() {
            this.collection = new i,
            this.collection.on("sync", this.renderEach, this)
        },
        render: function() {
            return s.html(this.$el.html(this.template())),
            this.collection.fetch(),
            this
        },
        renderEach: function() {
            if (0 == this.collection.state.totalRecords) {
                var t = e.template(o);
                $(".js-cash-list", this.$el).html(t({
                    info: "亲，您暂无提现信息！"
                })),
                $(".js-count", this.$el).html("")
            } else $(".js-count", this.$el).html('<div class="count-text">共<span>' + this.collection.state.totalRecords + "</span>条数据，合计成功提现<span>" + this.collection.state.cashed_money + "</span>元</div>"),
            this.collection.each(this.renderItem, this),
            this.bottomLoad();
            $(".loading").hide()
        },
        renderItem: function(t) {
            $(".js-cash-list", this.$el).append(new n({
                model: t
            }).render().$el)
        },
        bottomLoad: function() {
            var t = this;
            $(window).scroll(function() {
                var e = $(this).scrollTop(),
                i = $(document).height(),
                n = $(this).height();
                e + n == i && t.collection.hasNextPage() && t.collection.getNextPage({
                    reset: !0
                })
            })
        }
    })
}),
define("apps/newoutlet/collections/income", ["backbone.paginator", "apps/newoutlet/models/cash"],
function(t, e) {
    return Backbone.PageableCollection.extend({
        model: e,
        url: _global.url.api + "outlet_cash_income?did=" + _global.did,
        state: {
            pagesInRange: 0,
            pageSize: 10,
            sortKey: "dt_add",
            order: 1
        },
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: "limit",
            currentPage: null,
            offset: function() {
                return (this.state.currentPage - 1) * this.state.pageSize
            },
            did: _global.did,
            shop_id: _global.shop.id
        },
        parseState: function(t) {
            return {
                totalRecords: t._count,
                total_commission: t.total_commission
            }
        },
        parseRecords: function(t) {
            return t.data
        }
    })
}),
define("text!apps/newoutlet/templates/income_item.html", [],
function() {
    return '<div class="info">\r\n    <p class="f15 mb4">\r\n        {{?it.dlevel==\'1\'}}一级订单：\r\n        {{??it.dlevel==\'2\'}}\r\n        二级订单：\r\n        {{??it.dlevel==\'3\'}}\r\n        三级订单：\r\n        {{?}}\r\n        {{=it.order_sn}}</p>\r\n    <p class="tint-gray f12">{{=it.dt_add}}</p>\r\n</div>\r\n<div class="detail">\r\n    {{if(it.status == 0){}}\r\n    <p class="tint-gray f15 mb4">+{{=it.commission}}</p>\r\n    {{}else{}}\r\n    <p class="deep-green f15 mb4">+{{=it.commission}}</p>\r\n    {{}}}\r\n    {{if(it.status == 1){}}\r\n        <p class="tint-gray f12 t_right">已结算</p>\r\n    {{}else{}}\r\n        <p class="tint-gray f12 t_right">未结算</p>\r\n    {{}}}\r\n</div>'
}),
define("apps/newoutlet/views/income_item", ["backbone", "doT", "text!apps/newoutlet/templates/income_item.html"],
function(t, e, i) {
    return t.View.extend({
        className: "item cash-list",
        template: e.template(i),
        events: {},
        initialize: function() {
            this.listenTo(this.model, "sync", this.render)
        },
        render: function() {
            return this.$el.html(this.template(this.model.toJSON())),
            this
        }
    })
}),
define("text!apps/newoutlet/templates/income.html", [],
function() {
    return '<header class="top-tab">\r\n    <ul class="clearfix">\r\n        <li class="on"><a href="/outlet#income">佣金</a></li>\r\n        <li><a href="/outlet#cash">提现</a></li>\r\n    </ul>\r\n</header>\r\n<div class="js-count"></div>\r\n<div class="bd js-cash-list" style="padding: 0;"></div>'
}),
define("apps/newoutlet/views/income", ["backbone", "doT", "apps/newoutlet/collections/income", "apps/newoutlet/views/income_item", "text!apps/newoutlet/templates/income.html", "text!apps/newoutlet/templates/list_empty.html"],
function(t, e, i, n, r, o) {
    var s = $("#views");
    return t.View.extend({
        template: e.template(r),
        className: "page-view page-cash",
        events: {},
        initialize: function() {
            this.collection = new i,
            this.collection.on("sync", this.renderEach, this)
        },
        render: function() {
            return s.html(this.$el.html(this.template())),
            this.collection.fetch(),
            this
        },
        renderEach: function() {
            if (0 == this.collection.state.totalRecords) {
                var t = e.template(o);
                $(".js-cash-list", this.$el).html(t({
                    info: "亲，您暂无收入信息！"
                })),
                $(".js-count", this.$el).html("")
            } else $(".js-count", this.$el).html('<div class="count-text">共<span>' + this.collection.state.totalRecords + "</span>条数据，合计佣金<span>" + this.collection.state.total_commission + "</span>元</div>"),
            this.collection.each(this.renderItem, this),
            this.bottomLoad();
            $(".loading").hide()
        },
        renderItem: function(t) {
            $(".js-cash-list", this.$el).append(new n({
                model: t
            }).render().$el)
        },
        bottomLoad: function() {
            var t = this;
            $(window).scroll(function() {
                var e = $(this).scrollTop(),
                i = $(document).height(),
                n = $(this).height();
                e + n == i && t.collection.hasNextPage() && t.collection.getNextPage({
                    reset: !0
                })
            })
        }
    })
}),
define("apps/newoutlet/collections/outlet_ranks", ["backbone.paginator", "apps/newoutlet/models/cash"],
function(t, e) {
    return Backbone.PageableCollection.extend({
        model: e,
        url: _global.url.api + "outlet_ranks?shop_id=" + _global.shop.id + "did=" + _global.did,
        state: {
            pagesInRange: 0,
            pageSize: 1,
            sortKey: "dt_add",
            order: 1
        },
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: "limit",
            currentPage: null,
            offset: function() {
                return (this.state.currentPage - 1) * this.state.pageSize
            },
            did: _global.did,
            shop_id: _global.shop.id
        },
        parseState: function(t) {
            return {
                current_income_amount: t.current_income_amount,
                current_listorder: t.current_listorder
            }
        },
        parseRecords: function(t) {
            return t.data
        }
    })
}),
define("apps/newoutlet/collections/month_ranks", ["backbone.paginator", "apps/newoutlet/models/cash"],
function(t, e) {
    return Backbone.PageableCollection.extend({
        model: e,
        url: _global.url.api + "month_ranks?shop_id=" + _global.shop.id + "did=" + _global.did,
        state: {
            pagesInRange: 0,
            pageSize: 1,
            sortKey: "dt_add",
            order: 1
        },
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: "limit",
            currentPage: null,
            offset: function() {
                return (this.state.currentPage - 1) * this.state.pageSize
            },
            did: _global.did,
            shop_id: _global.shop.id
        },
        parseState: function(t) {
            return {
                current_income_amount: t.current_income_amount,
                current_listorder: t.current_listorder
            }
        },
        parseRecords: function(t) {
            return t.data
        }
    })
}),
define("apps/newoutlet/collections/day_ranks", ["backbone.paginator", "apps/newoutlet/models/cash"],
function(t, e) {
    return Backbone.PageableCollection.extend({
        model: e,
        url: _global.url.api + "day_ranks?shop_id=" + _global.shop.id + "did=" + _global.did,
        state: {
            pagesInRange: 0,
            pageSize: 1,
            sortKey: "dt_add",
            order: 1
        },
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: "limit",
            currentPage: null,
            offset: function() {
                return (this.state.currentPage - 1) * this.state.pageSize
            },
            did: _global.did,
            shop_id: _global.shop.id
        },
        parseState: function(t) {
            return {
                current_income_amount: t.current_income_amount,
                current_listorder: t.current_listorder
            }
        },
        parseRecords: function(t) {
            return t.data
        }
    })
}),
define("apps/newoutlet/collections/commission1_ranks", ["backbone.paginator", "apps/newoutlet/models/cash"],
function(t, e) {
    return Backbone.PageableCollection.extend({
        model: e,
        url: _global.url.api + "outlet_commission1_ranks?shop_id=" + _global.shop.id + "did=" + _global.did,
        state: {
            pagesInRange: 0,
            pageSize: 1,
            sortKey: "dt_add",
            order: 1
        },
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: "limit",
            currentPage: null,
            offset: function() {
                return (this.state.currentPage - 1) * this.state.pageSize
            },
            did: _global.did,
            shop_id: _global.shop.id
        },
        parseState: function(t) {
            return {
                current_income_amount: t.current_income_amount,
                current_listorder: t.current_listorder
            }
        },
        parseRecords: function(t) {
            return t.data
        }
    })
}),
define("text!apps/newoutlet/templates/ranks_item.html", [],
function() {
    return '<span class="num"><b>{{=it.rank}}</b></span>\r\n<span class="header-pic"><img src="{{=it.avatar||\'/assets/img/wap/outlet/default_head_img.jpg\'}}" alt=""></span>\r\n           <span class="nickname">\r\n               <div>{{=it.name}}</div>\r\n               <div class="desc">{{=it.sub_number}}个伙伴</div>\r\n           </span>\r\n<span class="price">￥{{=it.sales_commission||\'0.00\'}}</span>\r\n'
}),
define("apps/newoutlet/views/ranks_item", ["backbone", "doT", "text!apps/newoutlet/templates/ranks_item.html"],
function(t, e, i) {
    return t.View.extend({
        className: "clearfix",
        tagName: "li",
        template: e.template(i),
        events: {},
        initialize: function() {
            this.listenTo(this.model, "sync", this.render)
        },
        render: function() {
            return this.model.get("name") == _global.member.name && this.$el.addClass("on"),
            this.$el.html(this.template(this.model.toJSON())),
            this
        }
    })
}),
define("text!apps/newoutlet/templates/ranks.html", [],
function() {
    return '<header><img src="/assets/img/wap/outlet/top_header.jpg" width="100%" alt=""></header>\r\n        <div class="ranks-tab">\r\n            <ul class="clearfix">\r\n                {{?(_global.shop.id != \'8390\')}}\r\n                <li class="on js-month"><a>当月排名</a></li>\r\n                <li class="js-all"><a>总排名</a></li>\r\n                <!-- <li class="js-shop"><a>店铺排名</a></li> -->\r\n                {{??}}\r\n                <li class="on js-day"><a>今日排名</a></li>\r\n                <li class="js-all"><a>总排名</a></li>\r\n                {{?}}\r\n            </ul>\r\n        </div>\r\n<div class="top-title js-title"></div>\r\n<ul class="member-list js-ranks-list"></ul>'
}),
define("apps/newoutlet/views/ranks", ["backbone", "doT", "apps/newoutlet/collections/outlet_ranks", "apps/newoutlet/collections/month_ranks", "apps/newoutlet/collections/day_ranks", "apps/newoutlet/collections/commission1_ranks", "apps/newoutlet/views/ranks_item", "components/pager/main", "text!apps/newoutlet/templates/ranks.html"],
function(t, e, i, n, r, o, s, a, l) {
    var h = $("#views");
    return t.View.extend({
        template: e.template(l),
        className: "page-top",
        events: {
            "click .js-day": "rank_day",
            "click .js-month": "rank_month",
            "click .js-all": "rank_all",
            "click .js-shop": "rank_shop"
        },
        initialize: function() {
            this.collection = new n,
            this.collection.on("sync", this.renderEach, this)
        },
        render: function() {
            return "8390" == _global.shop.id && (this.collection = new r, this.collection.on("sync", this.renderEach, this)),
            h.html(this.$el.html(this.template())),
            this.collection.fetch(),
            this
        },
        rank_day: function(t) {
            $(".loading").show(),
            $(t.currentTarget).siblings().removeClass("on"),
            $(t.currentTarget).addClass("on"),
            $(".js-ranks-list", this.$el).html(""),
            this.collection = new r,
            this.collection.on("sync", this.renderEach, this),
            this.collection.fetch()
        },
        rank_month: function(t) {
            $(".loading").show(),
            $(t.currentTarget).siblings().removeClass("on"),
            $(t.currentTarget).addClass("on"),
            $(".js-ranks-list", this.$el).html(""),
            this.collection = new n,
            this.collection.on("sync", this.renderEach, this),
            this.collection.fetch()
        },
        rank_all: function(t) {
            $(".loading").show(),
            $(t.currentTarget).siblings().removeClass("on"),
            $(t.currentTarget).addClass("on"),
            $(".js-ranks-list", this.$el).html(""),
            this.collection = new i,
            this.collection.on("sync", this.renderEach, this),
            this.collection.fetch()
        },
        rank_shop: function(t) {
            $(".loading").show(),
            $(t.currentTarget).siblings().removeClass("on"),
            $(t.currentTarget).addClass("on"),
            $(".js-ranks-list", this.$el).html(""),
            this.collection = new o,
            this.collection.on("sync", this.renderEach, this),
            this.collection.fetch()
        },
        renderEach: function() {
            if (0 == this.collection.state.totalRecords) $(".js-title", this.$el).html("");
            else {
                var t = 0 == this.collection.state.current_income_amount ? "-": this.collection.state.current_listorder;
                $(".js-title", this.$el).html("<div>我的佣金<span>" + this.collection.state.current_income_amount + "</span>元，当前排名：<span>" + t + "</span></div>"),
                this.collection.each(function(t, e) {
                    t.set("index", e + 1),
                    $(".js-ranks-list", this.$el).append(new s({
                        model: t
                    }).render().$el)
                })
            }
            $(".loading").hide()
        }
    })
}),
define("apps/newoutlet/models/outlet_levels", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "outlet_levels?shop_id=" + _global.shop.id
        }
    })
}),
define("text!apps/newoutlet/templates/outlet_levels.html", [],
function() {
    return '<link rel="stylesheet" type="text/css" href="{{=_global.shop_url}}/assets/css/wap/v2/outlet_levels.css">\r\n<ul class="header">\r\n        <li class="header1">\r\n            <div class="logo" ><img src=\'{{=_global.member.avatar}}\'/></div>\r\n            <div class="level f12">Lv.3</div>\r\n        </li>\r\n        <li class="header2 f16">你好，{{=_global.member.name}}</li>\r\n        <li class="header3 f14">\r\n            您的佣金：\r\n            <span class="deep-yellow">￥1850.00</span>\r\n            ，离升级还差\r\n            <span class="deep-yellow">￥1150.00</span>\r\n        </li>\r\n        <li class="header4">\r\n            <span  class="white font-weight800">我的佣金增幅：<span class="deep-yellow">1.5倍</span></span>\r\n        </li>\r\n        <li class="header5">\r\n            <span class="t_center Uniform f16 deep-yellow">\r\n            15</br><span class="lh white">一级佣金 </span>\r\n            </span>\r\n            <span class="t_center Uniform f16 wborder deep-yellow">\r\n            7.5</br><span class="lh white">二级佣金 </span>\r\n            </span>\r\n            <span class=" Uniform f16 wborder t_center deep-yellow">\r\n            1.5</br><span class="lh white">三级佣金 </span>\r\n            </span>\r\n        </li>\r\n    </ul>\r\n\r\n    <div class="progress">\r\n        {{if(it.data.length==0){}}\r\n        <div id="round" class="roundb round " ><span id="bround"  class="bround f16 gray">LV.1</span> </div>\r\n        {{}}}\r\n        {{for(var i in it.data){}}\r\n        <div id="round" class="roundb round" data-id="{{=it.data[i].id}}"><span id="bround" data-id="{{=it.data[i].id}}" class="bround f16 gray">LV.{{=parseInt(i)+1}}</span> </div>\r\n\r\n        {{if( it.data.length>parseInt(i)+1){}}\r\n\r\n        <div class="round">\r\n            <span class="sround"></span>\r\n            <span class="sround"></span>\r\n            <span class="sround"></span>\r\n            <span class="sround"></span>\r\n        </div>\r\n        {{}}}\r\n        {{}}}\r\n    </div>\r\n    <div id=\'all\'></div>\r\n  <div class="bg">\r\n       <div class="dialog">\r\n           <p>什么是佣金增幅？</p>\r\n           <span>为了更好的鼓励分销商们拓展业务，商家为不同能力的分销商设置了不同的佣金比例。让能力好的分销商能够获得更多的佣金。\r\n           以{{=it.data[0].name}}的佣金比例为基准线，设置佣金增幅（N倍），佣金增幅按照倍数设置。\r\n           其他分销商等级的佣金比例={{=it.data[0].name}}的佣金比例×倍数。</span>\r\n           <div class="helpbtn">好的，知道了</div>\r\n       </div>\r\n   </div> '
}),
define("apps/newoutlet/models/outlet_level", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "outlet_level?shop_id=" + _global.shop.id + "&id=" + this.id
        }
    })
}),
define("text!apps/newoutlet/templates/outlet_level.html", [],
function() {
    return '\r\n<p class="item f16 " style="border: 0px;">\r\n        Lv.{{=it.lv_num}}： {{=it.name}}\r\n</p>\r\n<!-- <div class="item">\r\n        <span class="bold  font-weight800">佣金增幅：<span><span class="deep-red">{{=it.increase}}倍</span>\r\n        <div class="whybtn"><span class="question">?</span>什么是佣金增幅</div>\r\n    </div> -->\r\n    <p class="item">\r\n        <span class="t_center Uniform f16 deep-orange">\r\n            {{=it.lv1}}%</br><span class="lh gray">一级佣金 </span>\r\n        </span>\r\n        <span class="t_center Uniform f16 gborder deep-orange">\r\n            {{=it.lv2}}%</br><span class="lh gray">二级佣金 </span>\r\n        </span>\r\n        <span class=" Uniform f16 gborder t_center deep-orange">\r\n            {{=it.lv3}}%</br><span class="lh gray">三级佣金 </span>\r\n        </span>\r\n    </p>\r\n    <p class="item">\r\n        <span class="f16 tint-black bold font-weight800" style="display: block;">等级说明:</span>\r\n        <span class="f12 gray">\r\n        {{=it.description}}\r\n        </span>\r\n    </p>\r\n'
}),
define("apps/newoutlet/views/level", ["backbone", "doT", "apps/newoutlet/models/outlet_level", "text!apps/newoutlet/templates/outlet_level.html"],
function(t, e, i, n) {
    $("#all");
    return t.View.extend({
        template: e.template(n),
        events: {},
        initialize: function() {
            this.model = new i({
                id: this.id
            })
        },
        render: function(t, e) {
            var i = this;
            return 0 == t ? this.model.fetch({
                success: function() {
                    $("#all").html(i.$el.html(i.template(i.model.toJSON())))
                }
            }) : $("#all").html(i.$el.html(i.template(e))),
            this
        }
    })
}),
define("apps/newoutlet/views/levels", ["backbone", "doT", "apps/newoutlet/models/outlet_levels", "text!apps/newoutlet/templates/outlet_levels.html", "apps/newoutlet/views/level"],
function(t, e, i, n, r) {
    var o = $("#views");
    return t.View.extend({
        template: e.template(n),
        events: {
            "click .bround": "round",
            "click .whybtn": "showhelp",
            "click .helpbtn": "hidehelp"
        },
        initialize: function() {
            this.model = new i
        },
        render: function() {
            var t = this;
            return this.model.fetch({
                success: function() {
                    o.html(t.$el.html(t.template(t.model.toJSON()))),
                    $(".loading").hide(),
                    t.getmydata(),
                    $("#views").css("overflow", "hidden")
                }
            }),
            this
        },
        round: function(t) {
            if ($(".bround").length > 1) {
                $("#roundimg").remove(),
                $(t.target).parent().append("<img id='roundimg' src='" + _global.shop_url + "/assets/img/wap/triangle.jpg'/> "),
                $(".bround").removeClass("orange"),
                $(t.target).addClass("orange");
                var e = new r({
                    id: $(t.target).attr("data-id")
                });
                e.render(0)
            }
        },
        roundnew: function(t) {
            $($(".roundb")[t - 1]).append("<img id='roundimg' src='" + _global.shop_url + "/assets/img/wap/triangle.jpg'/>"),
            $($(".bround")[t - 1]).addClass("orange");
            var e = new r({
                id: $($(".bround")[t - 1]).attr("data-id")
            });
            0 == this.model.get("_count") ? e.render(1, this.model.get("default_data")) : e.render(0)
        },
        getmydata: function() {
            var t = this;
            $.ajax({
                type: "GET",
                async: !1,
                url: _global.url.api + "distributor_new",
                data: {
                    shop_id: _global.shop.id
                },
                dataType: "json",
                success: function(e) {
                    $(".header5").html("<span class=' t_center Uniform f16 deep-yellow'>" + +e.lv1 + "%</br><span class='lh white'>一级佣金 </span></span><span class=' wborder t_center Uniform f16 deep-yellow'>" + +e.lv2 + "%</br><span class='lh white'>二级佣金 </span></span><span class='wborder t_center Uniform f16 deep-yellow'>" + +e.lv3 + "%</br><span class='lh white'>三级佣金 </span></span>"),
                    0 == e.level_type ? ($(".header4").html("<span  class='bold font-weight800 white'>我的佣金比例：</span>"), $(".level").html("Lv." + e.lv_num), $(".header3").html(0 == e.lv_highest ? "您的佣金：<span class='deep-yellow'>￥" + e.sales_commission + "</span>，离升级还差<span class='deep-yellow'>￥" + e.margin_commission + "</span>": "您的佣金：<span class='deep-yellow'>￥" + e.sales_commission + "</span>,您已达到巅峰。")) : ($(".level").html("特"), $(".header4").html("<span  class='bold font-weight800 white '>我的佣金比例(特)：</span>"), $(".header3").html("您的特权有效期至：" + e.lose_time)),
                    t.roundnew(e.lv_num)
                }
            })
        },
        showhelp: function() {
            $(".bg").show(),
            $(".helpbtn").show()
        },
        hidehelp: function() {
            $(".bg").hide(),
            $(".helpbtn").hide()
        }
    })
}),
define("apps/newoutlet/collections/inform", ["backbone.paginator"],
function() {
    return Backbone.PageableCollection.extend({
        url: _global.url.api + "outlet_notifications?shop_id=" + _global.shop.id,
        state: {
            pagesInRange: 0,
            pageSize: 6,
            order: 1
        },
        queryParams: {
            totalPages: null,
            totalRecords: null,
            pageSize: "limit",
            currentPage: null,
            offset: function() {
                return (this.state.currentPage - 1) * this.state.pageSize
            },
            shop_id: _global.shop.id
        },
        parseState: function(t) {
            return {
                totalRecords: t._count
            }
        },
        parseRecords: function(t) {
            return t.data
        }
    })
}),
define("text!apps/newoutlet/templates/inform.html", [],
function() {
    return '<p class="inform_header">通知条数:<span></span>条</p>\r\n<ul class="inform_mian">\r\n	\r\n		{{for(var i in it.model){}}\r\n		<li>\r\n		<p class="inform_content">{{=it.model[i].content}}</p>\r\n		<p class="inform_dt_publish">通知时间:{{=it.model[i].dt_publish}}</p>\r\n		</li>\r\n		{{}}}\r\n	\r\n\r\n</ul>'
}),
define("apps/newoutlet/views/inform", ["backbone", "doT", "apps/newoutlet/collections/inform", "text!apps/newoutlet/templates/inform.html"],
function(t, e, i, n) {
    var r = $("#views");
    return t.View.extend({
        id: "view-center",
        template: e.template(n),
        events: {},
        initialize: function() {
            return this.informCollection = new i,
            this.informCollection.on("sync", this.renderList, this),
            this.informCollection.on("reset", this.renderItem, this),
            this
        },
        render: function() {
            return this.informCollection.fetch(),
            this
        },
        renderList: function(t) {
            r.html(this.$el.html(this.template({
                model: t.toJSON()
            }))),
            $(".inform_header span").html(this.informCollection.state.totalRecords),
            this.bottomLoad(),
            $(".loading").hide()
        },
        renderItem: function(t) {
            var e = "";
            $.each(t.toJSON(),
            function() {
                e += "<li><p class='inform_content'>" + this.content + "</p><p class='inform_dt_publish'>通知时间:" + this.dt_publish + "</p></li>"
            }),
            $(".inform_mian").append(e),
            $(".loading").hide()
        },
        bottomLoad: function() {
            var t = this,
            e = 0;
            $(window).scroll(function() {
                var i = $(this).scrollTop(),
                n = $(document).height(),
                r = $(this).height();
                i + r == n && e != n && (e = n, t.informCollection.hasNextPage() && (t.informCollection.off("sync"), t.informCollection.stopListening("sync"), $(".loading").show(), t.informCollection.getNextPage({
                    reset: !0
                })))
            })
        }
    })
}),
!
function(t) {
    var e, i; !
    function() {
        function t(t, e) {
            if (!e) return t;
            if (0 === t.indexOf(".")) {
                var i = e.split("/"),
                n = t.split("/"),
                r = i.length - 1,
                o = n.length,
                s = 0,
                a = 0;
                t: for (var l = 0; o > l; l++) switch (n[l]) {
                case "..":
                    if (! (r > s)) break t;
                    s++,
                    a++;
                    break;
                case ".":
                    a++;
                    break;
                default:
                    break t
                }
                return i.length = r - s,
                n = n.slice(a),
                i.concat(n).join("/")
            }
            return t
        }
        function n(e) {
            function i(i, s) {
                if ("string" == typeof i) {
                    var a = n[i];
                    return a || (a = o(t(i, e)), n[i] = a),
                    a
                }
                i instanceof Array && (s = s ||
                function() {},
                s.apply(this, r(i, s, e)))
            }
            var n = {};
            return i
        }
        function r(i, n, r) {
            for (var a = [], l = s[r], h = 0, c = Math.min(i.length, n.length); c > h; h++) {
                var d, u = t(i[h], r);
                switch (u) {
                case "require":
                    d = l && l.require || e;
                    break;
                case "exports":
                    d = l.exports;
                    break;
                case "module":
                    d = l;
                    break;
                default:
                    d = o(u)
                }
                a.push(d)
            }
            return a
        }
        function o(t) {
            var e = s[t];
            if (!e) throw new Error("No " + t);
            if (!e.defined) {
                var i = e.factory,
                n = i.apply(this, r(e.deps || [], i, t));
                "undefined" != typeof n && (e.exports = n),
                e.defined = 1
            }
            return e.exports
        }
        var s = {};
        i = function(t, e, i) {
            s[t] = {
                id: t,
                deps: e,
                factory: i,
                defined: 0,
                exports: {},
                require: n(t)
            }
        },
        e = n("")
    } (),
    i("echarts/chart/pie", ["require", "./base", "zrender/shape/Text", "zrender/shape/Ring", "zrender/shape/Circle", "zrender/shape/Sector", "zrender/shape/Polyline", "../config", "../util/ecData", "zrender/tool/util", "zrender/tool/math", "zrender/tool/color", "../chart"],
    function(t) {
        function e(t, e, n, r, o) {
            i.call(this, t, e, n, r, o);
            var s = this;
            s.shapeHandler.onmouseover = function(t) {
                var e = t.target,
                i = h.get(e, "seriesIndex"),
                n = h.get(e, "dataIndex"),
                r = h.get(e, "special"),
                o = [e.style.x, e.style.y],
                a = e.style.startAngle,
                l = e.style.endAngle,
                c = ((l + a) / 2 + 360) % 360,
                d = e.highlightStyle.color,
                u = s.getLabel(i, n, r, o, c, d, !0);
                u && s.zr.addHoverShape(u);
                var p = s.getLabelLine(i, n, o, e.style.r0, e.style.r, c, d, !0);
                p && s.zr.addHoverShape(p)
            },
            this.refresh(r)
        }
        var i = t("./base"),
        n = t("zrender/shape/Text"),
        r = t("zrender/shape/Ring"),
        o = t("zrender/shape/Circle"),
        s = t("zrender/shape/Sector"),
        a = t("zrender/shape/Polyline"),
        l = t("../config");
        l.pie = {
            zlevel: 0,
            z: 2,
            clickable: !0,
            legendHoverLink: !0,
            center: ["50%", "50%"],
            radius: [0, "75%"],
            clockWise: !0,
            startAngle: 90,
            minAngle: 0,
            selectedOffset: 10,
            itemStyle: {
                normal: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    label: {
                        show: !0,
                        position: "outer"
                    },
                    labelLine: {
                        show: !0,
                        length: 20,
                        lineStyle: {
                            width: 1,
                            type: "solid"
                        }
                    }
                },
                emphasis: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    label: {
                        show: !1
                    },
                    labelLine: {
                        show: !1,
                        length: 20,
                        lineStyle: {
                            width: 1,
                            type: "solid"
                        }
                    }
                }
            }
        };
        var h = t("../util/ecData"),
        c = t("zrender/tool/util"),
        d = t("zrender/tool/math"),
        u = t("zrender/tool/color");
        return e.prototype = {
            type: l.CHART_TYPE_PIE,
            _buildShape: function() {
                var t = this.series,
                e = this.component.legend;
                this.selectedMap = {},
                this._selected = {};
                var i, n, s;
                this._selectedMode = !1;
                for (var a, c = 0,
                d = t.length; d > c; c++) if (t[c].type === l.CHART_TYPE_PIE) {
                    if (t[c] = this.reformOption(t[c]), this.legendHoverLink = t[c].legendHoverLink || this.legendHoverLink, a = t[c].name || "", this.selectedMap[a] = e ? e.isSelected(a) : !0, !this.selectedMap[a]) continue;
                    i = this.parseCenter(this.zr, t[c].center),
                    n = this.parseRadius(this.zr, t[c].radius),
                    this._selectedMode = this._selectedMode || t[c].selectedMode,
                    this._selected[c] = [],
                    this.deepQuery([t[c], this.option], "calculable") && (s = {
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase(),
                        hoverable: !1,
                        style: {
                            x: i[0],
                            y: i[1],
                            r0: n[0] <= 10 ? 0 : n[0] - 10,
                            r: n[1] + 10,
                            brushType: "stroke",
                            lineWidth: 1,
                            strokeColor: t[c].calculableHolderColor || this.ecTheme.calculableHolderColor || l.calculableHolderColor
                        }
                    },
                    h.pack(s, t[c], c, void 0, -1), this.setCalculable(s), s = n[0] <= 10 ? new o(s) : new r(s), this.shapeList.push(s)),
                    this._buildSinglePie(c),
                    this.buildMark(c)
                }
                this.addShapeList()
            },
            _buildSinglePie: function(t) {
                for (var e, i = this.series,
                n = i[t], r = n.data, o = this.component.legend, s = 0, a = 0, l = 0, h = Number.NEGATIVE_INFINITY, c = [], d = 0, u = r.length; u > d; d++) e = r[d].name,
                this.selectedMap[e] = o ? o.isSelected(e) : !0,
                this.selectedMap[e] && !isNaN(r[d].value) && (0 !== +r[d].value ? s++:a++, l += +r[d].value, h = Math.max(h, +r[d].value));
                if (0 !== l) {
                    for (var p, f, g, m, _, y, v = 100,
                    b = n.clockWise,
                    x = (n.startAngle.toFixed(2) - 0 + 360) % 360, T = n.minAngle || .01, w = 360 - T * s - .01 * a, S = n.roseType, d = 0, u = r.length; u > d; d++) if (e = r[d].name, this.selectedMap[e] && !isNaN(r[d].value)) {
                        if (f = o ? o.getColor(e) : this.zr.getColor(d), v = r[d].value / l, p = "area" != S ? b ? x - v * w - (0 !== v ? T: .01) : v * w + x + (0 !== v ? T: .01) : b ? x - 360 / u: 360 / u + x, p = p.toFixed(2) - 0, v = (100 * v).toFixed(2), g = this.parseCenter(this.zr, n.center), m = this.parseRadius(this.zr, n.radius), _ = +m[0], y = +m[1], "radius" === S ? y = r[d].value / h * (y - _) * .8 + .2 * (y - _) + _: "area" === S && (y = Math.sqrt(r[d].value / h) * (y - _) + _), b) {
                            var C;
                            C = x,
                            x = p,
                            p = C
                        }
                        this._buildItem(c, t, d, v, r[d].selected, g, _, y, x, p, f),
                        b || (x = p)
                    }
                    this._autoLabelLayout(c, g, y);
                    for (var d = 0,
                    u = c.length; u > d; d++) this.shapeList.push(c[d]);
                    c = null
                }
            },
            _buildItem: function(t, e, i, n, r, o, s, a, l, c, d) {
                var u = this.series,
                p = ((c + l) / 2 + 360) % 360,
                f = this.getSector(e, i, n, r, o, s, a, l, c, d);
                h.pack(f, u[e], e, u[e].data[i], i, u[e].data[i].name, n),
                t.push(f);
                var g = this.getLabel(e, i, n, o, p, d, !1),
                m = this.getLabelLine(e, i, o, s, a, p, d, !1);
                m && (h.pack(m, u[e], e, u[e].data[i], i, u[e].data[i].name, n), t.push(m)),
                g && (h.pack(g, u[e], e, u[e].data[i], i, u[e].data[i].name, n), g._labelLine = m, t.push(g))
            },
            getSector: function(t, e, i, n, r, o, a, l, h, c) {
                var p = this.series,
                f = p[t],
                g = f.data[e],
                m = [g, f],
                _ = this.deepMerge(m, "itemStyle.normal") || {},
                y = this.deepMerge(m, "itemStyle.emphasis") || {},
                v = this.getItemStyleColor(_.color, t, e, g) || c,
                b = this.getItemStyleColor(y.color, t, e, g) || ("string" == typeof v ? u.lift(v, -.2) : v),
                x = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    clickable: this.deepQuery(m, "clickable"),
                    style: {
                        x: r[0],
                        y: r[1],
                        r0: o,
                        r: a,
                        startAngle: l,
                        endAngle: h,
                        brushType: "both",
                        color: v,
                        lineWidth: _.borderWidth,
                        strokeColor: _.borderColor,
                        lineJoin: "round"
                    },
                    highlightStyle: {
                        color: b,
                        lineWidth: y.borderWidth,
                        strokeColor: y.borderColor,
                        lineJoin: "round"
                    },
                    _seriesIndex: t,
                    _dataIndex: e
                };
                if (n) {
                    var T = ((x.style.startAngle + x.style.endAngle) / 2).toFixed(2) - 0;
                    x.style._hasSelected = !0,
                    x.style._x = x.style.x,
                    x.style._y = x.style.y;
                    var w = this.query(f, "selectedOffset");
                    x.style.x += d.cos(T, !0) * w,
                    x.style.y -= d.sin(T, !0) * w,
                    this._selected[t][e] = !0
                } else this._selected[t][e] = !1;
                return this._selectedMode && (x.onclick = this.shapeHandler.onclick),
                this.deepQuery([g, f, this.option], "calculable") && (this.setCalculable(x), x.draggable = !0),
                (this._needLabel(f, g, !0) || this._needLabelLine(f, g, !0)) && (x.onmouseover = this.shapeHandler.onmouseover),
                x = new s(x)
            },
            getLabel: function(t, e, i, r, o, s, a) {
                var l = this.series,
                h = l[t],
                u = h.data[e];
                if (this._needLabel(h, u, a)) {
                    var p, f, g, m = a ? "emphasis": "normal",
                    _ = c.merge(c.clone(u.itemStyle) || {},
                    h.itemStyle),
                    y = _[m].label,
                    v = y.textStyle || {},
                    b = r[0],
                    x = r[1],
                    T = this.parseRadius(this.zr, h.radius),
                    w = "middle";
                    y.position = y.position || _.normal.label.position,
                    "center" === y.position ? (p = b, f = x, g = "center") : "inner" === y.position || "inside" === y.position ? (T = (T[0] + T[1]) * (y.distance || .5), p = Math.round(b + T * d.cos(o, !0)), f = Math.round(x - T * d.sin(o, !0)), s = "#fff", g = "center") : (T = T[1] - -_[m].labelLine.length, p = Math.round(b + T * d.cos(o, !0)), f = Math.round(x - T * d.sin(o, !0)), g = o >= 90 && 270 >= o ? "right": "left"),
                    "center" != y.position && "inner" != y.position && "inside" != y.position && (p += "left" === g ? 20 : -20),
                    u.__labelX = p - ("left" === g ? 5 : -5),
                    u.__labelY = f;
                    var S = new n({
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase() + 1,
                        hoverable: !1,
                        style: {
                            x: p,
                            y: f,
                            color: v.color || s,
                            text: this.getLabelText(t, e, i, m),
                            textAlign: v.align || g,
                            textBaseline: v.baseline || w,
                            textFont: this.getFont(v)
                        },
                        highlightStyle: {
                            brushType: "fill"
                        }
                    });
                    return S._radius = T,
                    S._labelPosition = y.position || "outer",
                    S._rect = S.getRect(S.style),
                    S._seriesIndex = t,
                    S._dataIndex = e,
                    S
                }
            },
            getLabelText: function(t, e, i, n) {
                var r = this.series,
                o = r[t],
                s = o.data[e],
                a = this.deepQuery([s, o], "itemStyle." + n + ".label.formatter");
                return a ? "function" == typeof a ? a.call(this.myChart, {
                    seriesIndex: t,
                    seriesName: o.name || "",
                    series: o,
                    dataIndex: e,
                    data: s,
                    name: s.name,
                    value: s.value,
                    percent: i
                }) : "string" == typeof a ? (a = a.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}").replace("{d}", "{d0}"), a = a.replace("{a0}", o.name).replace("{b0}", s.name).replace("{c0}", s.value).replace("{d0}", i)) : void 0 : s.name
            },
            getLabelLine: function(t, e, i, n, r, o, s, l) {
                var h = this.series,
                u = h[t],
                p = u.data[e];
                if (this._needLabelLine(u, p, l)) {
                    var f = l ? "emphasis": "normal",
                    g = c.merge(c.clone(p.itemStyle) || {},
                    u.itemStyle),
                    m = g[f].labelLine,
                    _ = m.lineStyle || {},
                    y = i[0],
                    v = i[1],
                    b = r,
                    x = this.parseRadius(this.zr, u.radius)[1] - -m.length,
                    T = d.cos(o, !0),
                    w = d.sin(o, !0);
                    return new a({
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase() + 1,
                        hoverable: !1,
                        style: {
                            pointList: [[y + b * T, v - b * w], [y + x * T, v - x * w], [p.__labelX, p.__labelY]],
                            strokeColor: _.color || s,
                            lineType: _.type,
                            lineWidth: _.width
                        },
                        _seriesIndex: t,
                        _dataIndex: e
                    })
                }
            },
            _needLabel: function(t, e, i) {
                return this.deepQuery([e, t], "itemStyle." + (i ? "emphasis": "normal") + ".label.show")
            },
            _needLabelLine: function(t, e, i) {
                return this.deepQuery([e, t], "itemStyle." + (i ? "emphasis": "normal") + ".labelLine.show")
            },
            _autoLabelLayout: function(t, e, i) {
                for (var n = [], r = [], o = 0, s = t.length; s > o; o++)("outer" === t[o]._labelPosition || "outside" === t[o]._labelPosition) && (t[o]._rect._y = t[o]._rect.y, t[o]._rect.x < e[0] ? n.push(t[o]) : r.push(t[o]));
                this._layoutCalculate(n, e, i, -1),
                this._layoutCalculate(r, e, i, 1)
            },
            _layoutCalculate: function(t, e, i, n) {
                function r(e, i, n) {
                    for (var r = e; i > r; r++) if (t[r]._rect.y += n, t[r].style.y += n, t[r]._labelLine && (t[r]._labelLine.style.pointList[1][1] += n, t[r]._labelLine.style.pointList[2][1] += n), r > e && i > r + 1 && t[r + 1]._rect.y > t[r]._rect.y + t[r]._rect.height) return void o(r, n / 2);
                    o(i - 1, n / 2)
                }
                function o(e, i) {
                    for (var n = e; n >= 0 && (t[n]._rect.y -= i, t[n].style.y -= i, t[n]._labelLine && (t[n]._labelLine.style.pointList[1][1] -= i, t[n]._labelLine.style.pointList[2][1] -= i), !(n > 0 && t[n]._rect.y > t[n - 1]._rect.y + t[n - 1]._rect.height)); n--);
                }
                function s(t, e, i, n, r) {
                    for (var o, s, a, l = i[0], h = i[1], c = r > 0 ? e ? Number.MAX_VALUE: 0 : e ? Number.MAX_VALUE: 0, d = 0, u = t.length; u > d; d++) s = Math.abs(t[d]._rect.y - h),
                    a = t[d]._radius - n,
                    o = n + a > s ? Math.sqrt((n + a + 20) * (n + a + 20) - Math.pow(t[d]._rect.y - h, 2)) : Math.abs(t[d]._rect.x + (r > 0 ? 0 : t[d]._rect.width) - l),
                    e && o >= c && (o = c - 10),
                    !e && c >= o && (o = c + 10),
                    t[d]._rect.x = t[d].style.x = l + o * r,
                    t[d]._labelLine && (t[d]._labelLine.style.pointList[2][0] = l + (o - 5) * r, t[d]._labelLine.style.pointList[1][0] = l + (o - 20) * r),
                    c = o
                }
                t.sort(function(t, e) {
                    return t._rect.y - e._rect.y
                });
                for (var a, l = 0,
                h = t.length,
                c = [], d = [], u = 0; h > u; u++) a = t[u]._rect.y - l,
                0 > a && r(u, h, -a, n),
                l = t[u]._rect.y + t[u]._rect.height;
                this.zr.getHeight() - l < 0 && o(h - 1, l - this.zr.getHeight());
                for (var u = 0; h > u; u++) t[u]._rect.y >= e[1] ? d.push(t[u]) : c.push(t[u]);
                s(d, !0, e, i, n),
                s(c, !1, e, i, n)
            },
            reformOption: function(t) {
                var e = c.merge;
                return t = e(e(t || {},
                c.clone(this.ecTheme.pie || {})), c.clone(l.pie)),
                t.itemStyle.normal.label.textStyle = this.getTextStyle(t.itemStyle.normal.label.textStyle),
                t.itemStyle.emphasis.label.textStyle = this.getTextStyle(t.itemStyle.emphasis.label.textStyle),
                this.z = t.z,
                this.zlevel = t.zlevel,
                t
            },
            refresh: function(t) {
                t && (this.option = t, this.series = t.series),
                this.backupShapeList(),
                this._buildShape()
            },
            addDataAnimation: function(t, e) {
                function i() {
                    a--,
                    0 === a && e && e()
                }
                for (var n = this.series,
                r = {},
                o = 0,
                s = t.length; s > o; o++) r[t[o][0]] = t[o];
                var a = 0,
                h = {},
                c = {},
                d = {},
                u = this.shapeList;
                this.shapeList = [];
                for (var p, f, g, m = {},
                o = 0,
                s = t.length; s > o; o++) p = t[o][0],
                f = t[o][2],
                g = t[o][3],
                n[p] && n[p].type === l.CHART_TYPE_PIE && (f ? (g || (h[p + "_" + n[p].data.length] = "delete"), m[p] = 1) : g ? m[p] = 0 : (h[p + "_-1"] = "delete", m[p] = -1), this._buildSinglePie(p));
                for (var _, y, o = 0,
                s = this.shapeList.length; s > o; o++) switch (p = this.shapeList[o]._seriesIndex, _ = this.shapeList[o]._dataIndex, y = p + "_" + _, this.shapeList[o].type) {
                case "sector":
                    h[y] = this.shapeList[o];
                    break;
                case "text":
                    c[y] = this.shapeList[o];
                    break;
                case "polyline":
                    d[y] = this.shapeList[o]
                }
                this.shapeList = [];
                for (var v, o = 0,
                s = u.length; s > o; o++) if (p = u[o]._seriesIndex, r[p]) {
                    if (_ = u[o]._dataIndex + m[p], y = p + "_" + _, v = h[y], !v) continue;
                    if ("sector" === u[o].type)"delete" != v ? (a++, this.zr.animate(u[o].id, "style").when(400, {
                        startAngle: v.style.startAngle,
                        endAngle: v.style.endAngle
                    }).done(i).start()) : (a++, this.zr.animate(u[o].id, "style").when(400, m[p] < 0 ? {
                        startAngle: u[o].style.startAngle
                    }: {
                        endAngle: u[o].style.endAngle
                    }).done(i).start());
                    else if ("text" === u[o].type || "polyline" === u[o].type) if ("delete" === v) this.zr.delShape(u[o].id);
                    else switch (u[o].type) {
                    case "text":
                        a++,
                        v = c[y],
                        this.zr.animate(u[o].id, "style").when(400, {
                            x: v.style.x,
                            y: v.style.y
                        }).done(i).start();
                        break;
                    case "polyline":
                        a++,
                        v = d[y],
                        this.zr.animate(u[o].id, "style").when(400, {
                            pointList: v.style.pointList
                        }).done(i).start()
                    }
                }
                this.shapeList = u,
                a || i()
            },
            onclick: function(t) {
                var e = this.series;
                if (this.isClick && t.target) {
                    this.isClick = !1;
                    for (var i, n = t.target,
                    r = n.style,
                    o = h.get(n, "seriesIndex"), s = h.get(n, "dataIndex"), a = 0, c = this.shapeList.length; c > a; a++) if (this.shapeList[a].id === n.id) {
                        if (o = h.get(n, "seriesIndex"), s = h.get(n, "dataIndex"), r._hasSelected) n.style.x = n.style._x,
                        n.style.y = n.style._y,
                        n.style._hasSelected = !1,
                        this._selected[o][s] = !1;
                        else {
                            var u = ((r.startAngle + r.endAngle) / 2).toFixed(2) - 0;
                            n.style._hasSelected = !0,
                            this._selected[o][s] = !0,
                            n.style._x = n.style.x,
                            n.style._y = n.style.y,
                            i = this.query(e[o], "selectedOffset"),
                            n.style.x += d.cos(u, !0) * i,
                            n.style.y -= d.sin(u, !0) * i
                        }
                        this.zr.modShape(n.id)
                    } else this.shapeList[a].style._hasSelected && "single" === this._selectedMode && (o = h.get(this.shapeList[a], "seriesIndex"), s = h.get(this.shapeList[a], "dataIndex"), this.shapeList[a].style.x = this.shapeList[a].style._x, this.shapeList[a].style.y = this.shapeList[a].style._y, this.shapeList[a].style._hasSelected = !1, this._selected[o][s] = !1, this.zr.modShape(this.shapeList[a].id));
                    this.messageCenter.dispatch(l.EVENT.PIE_SELECTED, t.event, {
                        selected: this._selected,
                        target: h.get(n, "name")
                    },
                    this.myChart),
                    this.zr.refreshNextFrame()
                }
            }
        },
        c.inherits(e, i),
        t("../chart").define("pie", e),
        e
    }),
    i("zrender/shape/Ring", ["require", "./Base", "../tool/util"],
    function(t) {
        var e = t("./Base"),
        i = function(t) {
            e.call(this, t)
        };
        return i.prototype = {
            type: "ring",
            buildPath: function(t, e) {
                t.arc(e.x, e.y, e.r, 0, 2 * Math.PI, !1),
                t.moveTo(e.x + e.r0, e.y),
                t.arc(e.x, e.y, e.r0, 0, 2 * Math.PI, !0)
            },
            getRect: function(t) {
                if (t.__rect) return t.__rect;
                var e;
                return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0,
                t.__rect = {
                    x: Math.round(t.x - t.r - e / 2),
                    y: Math.round(t.y - t.r - e / 2),
                    width: 2 * t.r + e,
                    height: 2 * t.r + e
                },
                t.__rect
            }
        },
        t("../tool/util").inherits(i, e),
        i
    }),
    i("zrender/shape/Text", ["require", "../tool/area", "./Base", "../tool/util"],
    function(t) {
        var e = t("../tool/area"),
        i = t("./Base"),
        n = function(t) {
            i.call(this, t)
        };
        return n.prototype = {
            type: "text",
            brush: function(t, i) {
                var n = this.style;
                if (i && (n = this.getHighlightStyle(n, this.highlightStyle || {})), "undefined" != typeof n.text && n.text !== !1) {
                    t.save(),
                    this.doClip(t),
                    this.setContext(t, n),
                    this.setTransform(t),
                    n.textFont && (t.font = n.textFont),
                    t.textAlign = n.textAlign || "start",
                    t.textBaseline = n.textBaseline || "middle";
                    var r, o = (n.text + "").split("\n"),
                    s = e.getTextHeight("国", n.textFont),
                    a = this.getRect(n),
                    l = n.x;
                    r = "top" == n.textBaseline ? a.y: "bottom" == n.textBaseline ? a.y + s: a.y + s / 2;
                    for (var h = 0,
                    c = o.length; c > h; h++) {
                        if (n.maxWidth) switch (n.brushType) {
                        case "fill":
                            t.fillText(o[h], l, r, n.maxWidth);
                            break;
                        case "stroke":
                            t.strokeText(o[h], l, r, n.maxWidth);
                            break;
                        case "both":
                            t.fillText(o[h], l, r, n.maxWidth),
                            t.strokeText(o[h], l, r, n.maxWidth);
                            break;
                        default:
                            t.fillText(o[h], l, r, n.maxWidth)
                        } else switch (n.brushType) {
                        case "fill":
                            t.fillText(o[h], l, r);
                            break;
                        case "stroke":
                            t.strokeText(o[h], l, r);
                            break;
                        case "both":
                            t.fillText(o[h], l, r),
                            t.strokeText(o[h], l, r);
                            break;
                        default:
                            t.fillText(o[h], l, r)
                        }
                        r += s
                    }
                    t.restore()
                }
            },
            getRect: function(t) {
                if (t.__rect) return t.__rect;
                var i = e.getTextWidth(t.text, t.textFont),
                n = e.getTextHeight(t.text, t.textFont),
                r = t.x;
                "end" == t.textAlign || "right" == t.textAlign ? r -= i: "center" == t.textAlign && (r -= i / 2);
                var o;
                return o = "top" == t.textBaseline ? t.y: "bottom" == t.textBaseline ? t.y - n: t.y - n / 2,
                t.__rect = {
                    x: r,
                    y: o,
                    width: i,
                    height: n
                },
                t.__rect
            }
        },
        t("../tool/util").inherits(n, i),
        n
    }),
    i("echarts/echarts", ["require", "./config", "zrender/tool/util", "zrender/tool/event", "zrender/tool/env", "zrender", "zrender/config", "./chart/island", "./component/toolbox", "./component", "./component/title", "./component/tooltip", "./component/legend", "./util/ecData", "./chart", "zrender/tool/color", "./component/timeline", "zrender/shape/Image", "zrender/loadingEffect/Bar", "zrender/loadingEffect/Bubble", "zrender/loadingEffect/DynamicLine", "zrender/loadingEffect/Ring", "zrender/loadingEffect/Spin", "zrender/loadingEffect/Whirling", "./theme/macarons", "./theme/infographic"],
    function(t) {
        function e() {
            s.Dispatcher.call(this)
        }
        function i(t) {
            t.innerHTML = "",
            this._themeConfig = {},
            this.dom = t,
            this._connected = !1,
            this._status = {
                dragIn: !1,
                dragOut: !1,
                needRefresh: !1
            },
            this._curEventType = !1,
            this._chartList = [],
            this._messageCenter = new e,
            this._messageCenterOutSide = new e,
            this.resize = this.resize(),
            this._init()
        }
        function n(t, e, i, n, r) {
            for (var o = t._chartList,
            s = o.length; s--;) {
                var a = o[s];
                "function" == typeof a[e] && a[e](i, n, r)
            }
        }
        var r = t("./config"),
        o = t("zrender/tool/util"),
        s = t("zrender/tool/event"),
        a = {},
        l = t("zrender/tool/env").canvasSupported,
        h = new Date - 0,
        c = {},
        d = "_echarts_instance_";
        a.version = "2.2.3",
        a.dependencies = {
            zrender: "2.0.9"
        },
        a.init = function(e, n) {
            var r = t("zrender");
            r.version.replace(".", "") - 0 < a.dependencies.zrender.replace(".", "") - 0 && console.error("ZRender " + r.version + " is too old for ECharts " + a.version + ". Current version need ZRender " + a.dependencies.zrender + "+"),
            e = e instanceof Array ? e[0] : e;
            var o = e.getAttribute(d);
            return o || (o = h++, e.setAttribute(d, o)),
            c[o] && c[o].dispose(),
            c[o] = new i(e),
            c[o].id = o,
            c[o].canvasSupported = l,
            c[o].setTheme(n),
            c[o]
        },
        a.getInstanceById = function(t) {
            return c[t]
        },
        o.merge(e.prototype, s.Dispatcher.prototype, !0);
        var u = t("zrender/config").EVENT,
        p = ["CLICK", "DBLCLICK", "MOUSEOVER", "MOUSEOUT", "DRAGSTART", "DRAGEND", "DRAGENTER", "DRAGOVER", "DRAGLEAVE", "DROP"];
        return i.prototype = {
            _init: function() {
                var e = this,
                i = t("zrender").init(this.dom);
                this._zr = i,
                this._messageCenter.dispatch = function(t, i, n, r) {
                    n = n || {},
                    n.type = t,
                    n.event = i,
                    e._messageCenter.dispatchWithContext(t, n, r),
                    e._messageCenterOutSide.dispatchWithContext(t, n, r)
                },
                this._onevent = function(t) {
                    return e.__onevent(t)
                };
                for (var n in r.EVENT)"CLICK" != n && "DBLCLICK" != n && "HOVER" != n && "MOUSEOUT" != n && "MAP_ROAM" != n && this._messageCenter.bind(r.EVENT[n], this._onevent, this);
                var o = {};
                this._onzrevent = function(t) {
                    return e[o[t.type]](t)
                };
                for (var s = 0,
                a = p.length; a > s; s++) {
                    var l = p[s],
                    h = u[l];
                    o[h] = "_on" + l.toLowerCase(),
                    i.on(h, this._onzrevent)
                }
                this.chart = {},
                this.component = {};
                var c = t("./chart/island");
                this._island = new c(this._themeConfig, this._messageCenter, i, {},
                this),
                this.chart.island = this._island;
                var d = t("./component/toolbox");
                this._toolbox = new d(this._themeConfig, this._messageCenter, i, {},
                this),
                this.component.toolbox = this._toolbox;
                var f = t("./component");
                f.define("title", t("./component/title")),
                f.define("tooltip", t("./component/tooltip")),
                f.define("legend", t("./component/legend")),
                (0 === i.getWidth() || 0 === i.getHeight()) && console.error("Dom’s width & height should be ready before init.")
            },
            __onevent: function(t) {
                t.__echartsId = t.__echartsId || this.id;
                var e = t.__echartsId === this.id;
                switch (this._curEventType || (this._curEventType = t.type), t.type) {
                case r.EVENT.LEGEND_SELECTED:
                    this._onlegendSelected(t);
                    break;
                case r.EVENT.DATA_ZOOM:
                    if (!e) {
                        var i = this.component.dataZoom;
                        i && (i.silence(!0), i.absoluteZoom(t.zoom), i.silence(!1))
                    }
                    this._ondataZoom(t);
                    break;
                case r.EVENT.DATA_RANGE:
                    e && this._ondataRange(t);
                    break;
                case r.EVENT.MAGIC_TYPE_CHANGED:
                    if (!e) {
                        var n = this.component.toolbox;
                        n && (n.silence(!0), n.setMagicType(t.magicType), n.silence(!1))
                    }
                    this._onmagicTypeChanged(t);
                    break;
                case r.EVENT.DATA_VIEW_CHANGED:
                    e && this._ondataViewChanged(t);
                    break;
                case r.EVENT.TOOLTIP_HOVER:
                    e && this._tooltipHover(t);
                    break;
                case r.EVENT.RESTORE:
                    this._onrestore();
                    break;
                case r.EVENT.REFRESH:
                    e && this._onrefresh(t);
                    break;
                case r.EVENT.TOOLTIP_IN_GRID:
                case r.EVENT.TOOLTIP_OUT_GRID:
                    if (e) {
                        if (this._connected) {
                            var o = this.component.grid;
                            o && (t.x = (t.event.zrenderX - o.getX()) / o.getWidth(), t.y = (t.event.zrenderY - o.getY()) / o.getHeight())
                        }
                    } else {
                        var o = this.component.grid;
                        o && this._zr.trigger("mousemove", {
                            connectTrigger: !0,
                            zrenderX: o.getX() + t.x * o.getWidth(),
                            zrenderY: o.getY() + t.y * o.getHeight()
                        })
                    }
                }
                if (this._connected && e && this._curEventType === t.type) {
                    for (var s in this._connected) this._connected[s].connectedEventHandler(t);
                    this._curEventType = null
                } (!e || !this._connected && e) && (this._curEventType = null)
            },
            _onclick: function(t) {
                if (n(this, "onclick", t), t.target) {
                    var e = this._eventPackage(t.target);
                    e && null != e.seriesIndex && this._messageCenter.dispatch(r.EVENT.CLICK, t.event, e, this)
                }
            },
            _ondblclick: function(t) {
                if (n(this, "ondblclick", t), t.target) {
                    var e = this._eventPackage(t.target);
                    e && null != e.seriesIndex && this._messageCenter.dispatch(r.EVENT.DBLCLICK, t.event, e, this)
                }
            },
            _onmouseover: function(t) {
                if (t.target) {
                    var e = this._eventPackage(t.target);
                    e && null != e.seriesIndex && this._messageCenter.dispatch(r.EVENT.HOVER, t.event, e, this)
                }
            },
            _onmouseout: function(t) {
                if (t.target) {
                    var e = this._eventPackage(t.target);
                    e && null != e.seriesIndex && this._messageCenter.dispatch(r.EVENT.MOUSEOUT, t.event, e, this)
                }
            },
            _ondragstart: function(t) {
                this._status = {
                    dragIn: !1,
                    dragOut: !1,
                    needRefresh: !1
                },
                n(this, "ondragstart", t)
            },
            _ondragenter: function(t) {
                n(this, "ondragenter", t)
            },
            _ondragover: function(t) {
                n(this, "ondragover", t)
            },
            _ondragleave: function(t) {
                n(this, "ondragleave", t)
            },
            _ondrop: function(t) {
                n(this, "ondrop", t, this._status),
                this._island.ondrop(t, this._status)
            },
            _ondragend: function(t) {
                if (n(this, "ondragend", t, this._status), this._timeline && this._timeline.ondragend(t, this._status), this._island.ondragend(t, this._status), this._status.needRefresh) {
                    this._syncBackupData(this._option);
                    var e = this._messageCenter;
                    e.dispatch(r.EVENT.DATA_CHANGED, t.event, this._eventPackage(t.target), this),
                    e.dispatch(r.EVENT.REFRESH, null, null, this)
                }
            },
            _onlegendSelected: function(t) {
                this._status.needRefresh = !1,
                n(this, "onlegendSelected", t, this._status),
                this._status.needRefresh && this._messageCenter.dispatch(r.EVENT.REFRESH, null, null, this)
            },
            _ondataZoom: function(t) {
                this._status.needRefresh = !1,
                n(this, "ondataZoom", t, this._status),
                this._status.needRefresh && this._messageCenter.dispatch(r.EVENT.REFRESH, null, null, this)
            },
            _ondataRange: function(t) {
                this._clearEffect(),
                this._status.needRefresh = !1,
                n(this, "ondataRange", t, this._status),
                this._status.needRefresh && this._zr.refreshNextFrame()
            },
            _onmagicTypeChanged: function() {
                this._clearEffect(),
                this._render(this._toolbox.getMagicOption())
            },
            _ondataViewChanged: function(t) {
                this._syncBackupData(t.option),
                this._messageCenter.dispatch(r.EVENT.DATA_CHANGED, null, t, this),
                this._messageCenter.dispatch(r.EVENT.REFRESH, null, null, this)
            },
            _tooltipHover: function(t) {
                var e = [];
                n(this, "ontooltipHover", t, e)
            },
            _onrestore: function() {
                this.restore()
            },
            _onrefresh: function(t) {
                this._refreshInside = !0,
                this.refresh(t),
                this._refreshInside = !1
            },
            _syncBackupData: function(t) {
                this.component.dataZoom && this.component.dataZoom.syncBackupData(t)
            },
            _eventPackage: function(e) {
                if (e) {
                    var i = t("./util/ecData"),
                    n = i.get(e, "seriesIndex"),
                    r = i.get(e, "dataIndex");
                    return r = -1 != n && this.component.dataZoom ? this.component.dataZoom.getRealDataIndex(n, r) : r,
                    {
                        seriesIndex: n,
                        seriesName: (i.get(e, "series") || {}).name,
                        dataIndex: r,
                        data: i.get(e, "data"),
                        name: i.get(e, "name"),
                        value: i.get(e, "value"),
                        special: i.get(e, "special")
                    }
                }
            },
            _noDataCheck: function(t) {
                for (var e = t.series,
                i = 0,
                n = e.length; n > i; i++) if (e[i].type == r.CHART_TYPE_MAP || e[i].data && e[i].data.length > 0 || e[i].markPoint && e[i].markPoint.data && e[i].markPoint.data.length > 0 || e[i].markLine && e[i].markLine.data && e[i].markLine.data.length > 0 || e[i].nodes && e[i].nodes.length > 0 || e[i].links && e[i].links.length > 0 || e[i].matrix && e[i].matrix.length > 0 || e[i].eventList && e[i].eventList.length > 0) return ! 1;
                var o = this._option && this._option.noDataLoadingOption || this._themeConfig.noDataLoadingOption || r.noDataLoadingOption || {
                    text: this._option && this._option.noDataText || this._themeConfig.noDataText || r.noDataText,
                    effect: this._option && this._option.noDataEffect || this._themeConfig.noDataEffect || r.noDataEffect
                };
                return this.clear(),
                this.showLoading(o),
                !0
            },
            _render: function(e) {
                if (this._mergeGlobalConifg(e), !this._noDataCheck(e)) {
                    var i = e.backgroundColor;
                    if (i) if (l || -1 == i.indexOf("rgba")) this.dom.style.backgroundColor = i;
                    else {
                        var n = i.split(",");
                        this.dom.style.filter = "alpha(opacity=" + 100 * n[3].substring(0, n[3].lastIndexOf(")")) + ")",
                        n.length = 3,
                        n[0] = n[0].replace("a", ""),
                        this.dom.style.backgroundColor = n.join(",") + ")"
                    }
                    this._zr.clearAnimation(),
                    this._chartList = [];
                    var o = t("./chart"),
                    s = t("./component"); (e.xAxis || e.yAxis) && (e.grid = e.grid || {},
                    e.dataZoom = e.dataZoom || {});
                    for (var a, h, c, d = ["title", "legend", "tooltip", "dataRange", "roamController", "grid", "dataZoom", "xAxis", "yAxis", "polar"], u = 0, p = d.length; p > u; u++) h = d[u],
                    c = this.component[h],
                    e[h] ? (c ? c.refresh && c.refresh(e) : (a = s.get(/^[xy]Axis$/.test(h) ? "axis": h), c = new a(this._themeConfig, this._messageCenter, this._zr, e, this, h), this.component[h] = c), this._chartList.push(c)) : c && (c.dispose(), this.component[h] = null, delete this.component[h]);
                    for (var f, g, m, _ = {},
                    u = 0,
                    p = e.series.length; p > u; u++) g = e.series[u].type,
                    g ? _[g] || (_[g] = !0, f = o.get(g), f ? (this.chart[g] ? (m = this.chart[g], m.refresh(e)) : m = new f(this._themeConfig, this._messageCenter, this._zr, e, this), this._chartList.push(m), this.chart[g] = m) : console.error(g + " has not been required.")) : console.error("series[" + u + "] chart type has not been defined.");
                    for (g in this.chart) g == r.CHART_TYPE_ISLAND || _[g] || (this.chart[g].dispose(), this.chart[g] = null, delete this.chart[g]);
                    this.component.grid && this.component.grid.refixAxisShape(this.component),
                    this._island.refresh(e),
                    this._toolbox.refresh(e),
                    e.animation && !e.renderAsImage ? this._zr.refresh() : this._zr.render();
                    var y = "IMG" + this.id,
                    v = document.getElementById(y);
                    e.renderAsImage && l ? (v ? v.src = this.getDataURL(e.renderAsImage) : (v = this.getImage(e.renderAsImage), v.id = y, v.style.position = "absolute", v.style.left = 0, v.style.top = 0, this.dom.firstChild.appendChild(v)), this.un(), this._zr.un(), this._disposeChartList(), this._zr.clear()) : v && v.parentNode.removeChild(v),
                    v = null,
                    this._option = e
                }
            },
            restore: function() {
                this._clearEffect(),
                this._option = o.clone(this._optionRestore),
                this._disposeChartList(),
                this._island.clear(),
                this._toolbox.reset(this._option, !0),
                this._render(this._option)
            },
            refresh: function(t) {
                this._clearEffect(),
                t = t || {};
                var e = t.option; ! this._refreshInside && e && (e = this.getOption(), o.merge(e, t.option, !0), o.merge(this._optionRestore, t.option, !0), this._toolbox.reset(e)),
                this._island.refresh(e),
                this._toolbox.refresh(e),
                this._zr.clearAnimation();
                for (var i = 0,
                n = this._chartList.length; n > i; i++) this._chartList[i].refresh && this._chartList[i].refresh(e);
                this.component.grid && this.component.grid.refixAxisShape(this.component),
                this._zr.refresh()
            },
            _disposeChartList: function() {
                this._clearEffect(),
                this._zr.clearAnimation();
                for (var t = this._chartList.length; t--;) {
                    var e = this._chartList[t];
                    if (e) {
                        var i = e.type;
                        this.chart[i] && delete this.chart[i],
                        this.component[i] && delete this.component[i],
                        e.dispose && e.dispose()
                    }
                }
                this._chartList = []
            },
            _mergeGlobalConifg: function(e) {
                for (var i = ["backgroundColor", "calculable", "calculableColor", "calculableHolderColor", "nameConnector", "valueConnector", "animation", "animationThreshold", "animationDuration", "animationDurationUpdate", "animationEasing", "addDataAnimation", "symbolList", "DRAG_ENABLE_TIME"], n = i.length; n--;) {
                    var o = i[n];
                    null == e[o] && (e[o] = null != this._themeConfig[o] ? this._themeConfig[o] : r[o])
                }
                var s = e.color;
                s && s.length || (s = this._themeConfig.color || r.color),
                this._zr.getColor = function(e) {
                    var i = t("zrender/tool/color");
                    return i.getColor(e, s)
                },
                l || (e.animation = !1, e.addDataAnimation = !1)
            },
            setOption: function(t, e) {
                return t.timeline ? this._setTimelineOption(t) : this._setOption(t, e)
            },
            _setOption: function(t, e) {
                return this._option = !e && this._option ? o.merge(this.getOption(), o.clone(t), !0) : o.clone(t),
                this._optionRestore = o.clone(this._option),
                this._option.series && 0 !== this._option.series.length ? (this.component.dataZoom && (this._option.dataZoom || this._option.toolbox && this._option.toolbox.feature && this._option.toolbox.feature.dataZoom && this._option.toolbox.feature.dataZoom.show) && this.component.dataZoom.syncOption(this._option), this._toolbox.reset(this._option), this._render(this._option), this) : void this._zr.clear()
            },
            getOption: function() {
                function t(t) {
                    var n = i._optionRestore[t];
                    if (n) if (n instanceof Array) for (var r = n.length; r--;) e[t][r].data = o.clone(n[r].data);
                    else e[t].data = o.clone(n.data)
                }
                var e = o.clone(this._option),
                i = this;
                return t("xAxis"),
                t("yAxis"),
                t("series"),
                e
            },
            setSeries: function(t, e) {
                return e ? (this._option.series = t, this.setOption(this._option, e)) : this.setOption({
                    series: t
                }),
                this
            },
            getSeries: function() {
                return this.getOption().series
            },
            _setTimelineOption: function(e) {
                this._timeline && this._timeline.dispose();
                var i = t("./component/timeline"),
                n = new i(this._themeConfig, this._messageCenter, this._zr, e, this);
                return this._timeline = n,
                this.component.timeline = this._timeline,
                this
            },
            addData: function(t, e, i, n, s) {
                function a() {
                    if (z._zr) {
                        z._zr.clearAnimation();
                        for (var t = 0,
                        e = C.length; e > t; t++) C[t].motionlessOnce = h.addDataAnimation && C[t].addDataAnimation;
                        z._messageCenter.dispatch(r.EVENT.REFRESH, null, {
                            option: h
                        },
                        z)
                    }
                }
                for (var l = t instanceof Array ? t: [[t, e, i, n, s]], h = this.getOption(), c = this._optionRestore, d = 0, u = l.length; u > d; d++) {
                    t = l[d][0],
                    e = l[d][1],
                    i = l[d][2],
                    n = l[d][3],
                    s = l[d][4];
                    var p = c.series[t],
                    f = i ? "unshift": "push",
                    g = i ? "pop": "shift";
                    if (p) {
                        var m = p.data,
                        _ = h.series[t].data;
                        if (m[f](e), _[f](e), n || (m[g](), e = _[g]()), null != s) {
                            var y, v;
                            if (p.type === r.CHART_TYPE_PIE && (y = c.legend) && (v = y.data)) {
                                var b = h.legend.data;
                                if (v[f](s), b[f](s), !n) {
                                    var x = o.indexOf(v, e.name); - 1 != x && v.splice(x, 1),
                                    x = o.indexOf(b, e.name),
                                    -1 != x && b.splice(x, 1)
                                }
                            } else if (null != c.xAxis && null != c.yAxis) {
                                var T, w, S = p.xAxisIndex || 0; (null == c.xAxis[S].type || "category" === c.xAxis[S].type) && (T = c.xAxis[S].data, w = h.xAxis[S].data, T[f](s), w[f](s), n || (T[g](), w[g]())),
                                S = p.yAxisIndex || 0,
                                "category" === c.yAxis[S].type && (T = c.yAxis[S].data, w = h.yAxis[S].data, T[f](s), w[f](s), n || (T[g](), w[g]()))
                            }
                        }
                        this._option.series[t].data = h.series[t].data
                    }
                }
                this._zr.clearAnimation();
                for (var C = this._chartList,
                k = 0,
                E = function() {
                    k--,
                    0 === k && a()
                },
                d = 0, u = C.length; u > d; d++) h.addDataAnimation && C[d].addDataAnimation && (k++, C[d].addDataAnimation(l, E));
                this.component.dataZoom && this.component.dataZoom.syncOption(h),
                this._option = h;
                var z = this;
                return h.addDataAnimation || setTimeout(a, 0),
                this
            },
            addMarkPoint: function(t, e) {
                return this._addMark(t, e, "markPoint")
            },
            addMarkLine: function(t, e) {
                return this._addMark(t, e, "markLine")
            },
            _addMark: function(t, e, i) {
                var n, r = this._option.series;
                if (r && (n = r[t])) {
                    var s = this._optionRestore.series,
                    a = s[t],
                    l = n[i],
                    h = a[i];
                    l = n[i] = l || {
                        data: []
                    },
                    h = a[i] = h || {
                        data: []
                    };
                    for (var c in e)"data" === c ? (l.data = l.data.concat(e.data), h.data = h.data.concat(e.data)) : "object" != typeof e[c] || null == l[c] ? l[c] = h[c] = e[c] : (o.merge(l[c], e[c], !0), o.merge(h[c], e[c], !0));
                    var d = this.chart[n.type];
                    d && d.addMark(t, e, i)
                }
                return this
            },
            delMarkPoint: function(t, e) {
                return this._delMark(t, e, "markPoint")
            },
            delMarkLine: function(t, e) {
                return this._delMark(t, e, "markLine")
            },
            _delMark: function(t, e, i) {
                var n, r, o, s = this._option.series;
                if (! (s && (n = s[t]) && (r = n[i]) && (o = r.data))) return this;
                e = e.split(" > ");
                for (var a = -1,
                l = 0,
                h = o.length; h > l; l++) {
                    var c = o[l];
                    if (c instanceof Array) {
                        if (c[0].name === e[0] && c[1].name === e[1]) {
                            a = l;
                            break
                        }
                    } else if (c.name === e[0]) {
                        a = l;
                        break
                    }
                }
                if (a > -1) {
                    o.splice(a, 1),
                    this._optionRestore.series[t][i].data.splice(a, 1);
                    var d = this.chart[n.type];
                    d && d.delMark(t, e.join(" > "), i)
                }
                return this
            },
            getDom: function() {
                return this.dom
            },
            getZrender: function() {
                return this._zr
            },
            getDataURL: function(t) {
                if (!l) return "";
                if (0 === this._chartList.length) {
                    var e = "IMG" + this.id,
                    i = document.getElementById(e);
                    if (i) return i.src
                }
                var n = this.component.tooltip;
                switch (n && n.hideTip(), t) {
                case "jpeg":
                    break;
                default:
                    t = "png"
                }
                var r = this._option.backgroundColor;
                return r && "rgba(0,0,0,0)" === r.replace(" ", "") && (r = "#fff"),
                this._zr.toDataURL("image/" + t, r)
            },
            getImage: function(t) {
                var e = this._optionRestore.title,
                i = document.createElement("img");
                return i.src = this.getDataURL(t),
                i.title = e && e.text || "ECharts",
                i
            },
            getConnectedDataURL: function(e) {
                if (!this.isConnected()) return this.getDataURL(e);
                var i = this.dom,
                n = {
                    self: {
                        img: this.getDataURL(e),
                        left: i.offsetLeft,
                        top: i.offsetTop,
                        right: i.offsetLeft + i.offsetWidth,
                        bottom: i.offsetTop + i.offsetHeight
                    }
                },
                r = n.self.left,
                o = n.self.top,
                s = n.self.right,
                a = n.self.bottom;
                for (var l in this._connected) i = this._connected[l].getDom(),
                n[l] = {
                    img: this._connected[l].getDataURL(e),
                    left: i.offsetLeft,
                    top: i.offsetTop,
                    right: i.offsetLeft + i.offsetWidth,
                    bottom: i.offsetTop + i.offsetHeight
                },
                r = Math.min(r, n[l].left),
                o = Math.min(o, n[l].top),
                s = Math.max(s, n[l].right),
                a = Math.max(a, n[l].bottom);
                var h = document.createElement("div");
                h.style.position = "absolute",
                h.style.left = "-4000px",
                h.style.width = s - r + "px",
                h.style.height = a - o + "px",
                document.body.appendChild(h);
                var c = t("zrender").init(h),
                d = t("zrender/shape/Image");
                for (var l in n) c.addShape(new d({
                    style: {
                        x: n[l].left - r,
                        y: n[l].top - o,
                        image: n[l].img
                    }
                }));
                c.render();
                var u = this._option.backgroundColor;
                u && "rgba(0,0,0,0)" === u.replace(/ /g, "") && (u = "#fff");
                var p = c.toDataURL("image/png", u);
                return setTimeout(function() {
                    c.dispose(),
                    h.parentNode.removeChild(h),
                    h = null
                },
                100),
                p
            },
            getConnectedImage: function(t) {
                var e = this._optionRestore.title,
                i = document.createElement("img");
                return i.src = this.getConnectedDataURL(t),
                i.title = e && e.text || "ECharts",
                i
            },
            on: function(t, e) {
                return this._messageCenterOutSide.bind(t, e, this),
                this
            },
            un: function(t, e) {
                return this._messageCenterOutSide.unbind(t, e),
                this
            },
            connect: function(t) {
                if (!t) return this;
                if (this._connected || (this._connected = {}), t instanceof Array) for (var e = 0,
                i = t.length; i > e; e++) this._connected[t[e].id] = t[e];
                else this._connected[t.id] = t;
                return this
            },
            disConnect: function(t) {
                if (!t || !this._connected) return this;
                if (t instanceof Array) for (var e = 0,
                i = t.length; i > e; e++) delete this._connected[t[e].id];
                else delete this._connected[t.id];
                for (var n in this._connected) return this;
                return this._connected = !1,
                this
            },
            connectedEventHandler: function(t) {
                t.__echartsId != this.id && this._onevent(t)
            },
            isConnected: function() {
                return !! this._connected
            },
            showLoading: function(e) {
                var i = {
                    bar: t("zrender/loadingEffect/Bar"),
                    bubble: t("zrender/loadingEffect/Bubble"),
                    dynamicLine: t("zrender/loadingEffect/DynamicLine"),
                    ring: t("zrender/loadingEffect/Ring"),
                    spin: t("zrender/loadingEffect/Spin"),
                    whirling: t("zrender/loadingEffect/Whirling")
                };
                this._toolbox.hideDataView(),
                e = e || {};
                var n = e.textStyle || {};
                e.textStyle = n;
                var s = o.merge(o.merge(o.clone(n), this._themeConfig.textStyle), r.textStyle);
                n.textFont = s.fontStyle + " " + s.fontWeight + " " + s.fontSize + "px " + s.fontFamily,
                n.text = e.text || this._option && this._option.loadingText || this._themeConfig.loadingText || r.loadingText,
                null != e.x && (n.x = e.x),
                null != e.y && (n.y = e.y),
                e.effectOption = e.effectOption || {},
                e.effectOption.textStyle = n;
                var a = e.effect;
                return ("string" == typeof a || null == a) && (a = i[e.effect || this._option && this._option.loadingEffect || this._themeConfig.loadingEffect || r.loadingEffect] || i.spin),
                this._zr.showLoading(new a(e.effectOption)),
                this
            },
            hideLoading: function() {
                return this._zr.hideLoading(),
                this
            },
            setTheme: function(e) {
                if (e) {
                    if ("string" == typeof e) switch (e) {
                    case "macarons":
                        e = t("./theme/macarons");
                        break;
                    case "infographic":
                        e = t("./theme/infographic");
                        break;
                    default:
                        e = {}
                    } else e = e || {};
                    this._themeConfig = e
                }
                if (!l) {
                    var i = this._themeConfig.textStyle;
                    i && i.fontFamily && i.fontFamily2 && (i.fontFamily = i.fontFamily2),
                    i = r.textStyle,
                    i.fontFamily = i.fontFamily2
                }
                this._timeline && this._timeline.setTheme(!0),
                this._optionRestore && this.restore()
            },
            resize: function() {
                var t = this;
                return function() {
                    if (t._clearEffect(), t._zr.resize(), t._option && t._option.renderAsImage && l) return t._render(t._option),
                    t;
                    t._zr.clearAnimation(),
                    t._island.resize(),
                    t._toolbox.resize(),
                    t._timeline && t._timeline.resize();
                    for (var e = 0,
                    i = t._chartList.length; i > e; e++) t._chartList[e].resize && t._chartList[e].resize();
                    return t.component.grid && t.component.grid.refixAxisShape(t.component),
                    t._zr.refresh(),
                    t._messageCenter.dispatch(r.EVENT.RESIZE, null, null, t),
                    t
                }
            },
            _clearEffect: function() {
                this._zr.modLayer(r.EFFECT_ZLEVEL, {
                    motionBlur: !1
                }),
                this._zr.painter.clearLayer(r.EFFECT_ZLEVEL)
            },
            clear: function() {
                return this._disposeChartList(),
                this._zr.clear(),
                this._option = {},
                this._optionRestore = {},
                this.dom.style.backgroundColor = null,
                this
            },
            dispose: function() {
                var t = this.dom.getAttribute(d);
                t && delete c[t],
                this._island.dispose(),
                this._toolbox.dispose(),
                this._timeline && this._timeline.dispose(),
                this._messageCenter.unbind(),
                this.clear(),
                this._zr.dispose(),
                this._zr = null
            }
        },
        a
    }),
    i("zrender/shape/Sector", ["require", "../tool/math", "../tool/computeBoundingBox", "../tool/vector", "./Base", "../tool/util"],
    function(t) {
        var e = t("../tool/math"),
        i = t("../tool/computeBoundingBox"),
        n = t("../tool/vector"),
        r = t("./Base"),
        o = n.create(),
        s = n.create(),
        a = n.create(),
        l = n.create(),
        h = function(t) {
            r.call(this, t)
        };
        return h.prototype = {
            type: "sector",
            buildPath: function(t, i) {
                var n = i.x,
                r = i.y,
                o = i.r0 || 0,
                s = i.r,
                a = i.startAngle,
                l = i.endAngle,
                h = i.clockWise || !1;
                a = e.degreeToRadian(a),
                l = e.degreeToRadian(l),
                h || (a = -a, l = -l);
                var c = e.cos(a),
                d = e.sin(a);
                t.moveTo(c * o + n, d * o + r),
                t.lineTo(c * s + n, d * s + r),
                t.arc(n, r, s, a, l, !h),
                t.lineTo(e.cos(l) * o + n, e.sin(l) * o + r),
                0 !== o && t.arc(n, r, o, l, a, h),
                t.closePath()
            },
            getRect: function(t) {
                if (t.__rect) return t.__rect;
                var r = t.x,
                h = t.y,
                c = t.r0 || 0,
                d = t.r,
                u = e.degreeToRadian(t.startAngle),
                p = e.degreeToRadian(t.endAngle),
                f = t.clockWise;
                return f || (u = -u, p = -p),
                c > 1 ? i.arc(r, h, c, u, p, !f, o, a) : (o[0] = a[0] = r, o[1] = a[1] = h),
                i.arc(r, h, d, u, p, !f, s, l),
                n.min(o, o, s),
                n.max(a, a, l),
                t.__rect = {
                    x: o[0],
                    y: o[1],
                    width: a[0] - o[0],
                    height: a[1] - o[1]
                },
                t.__rect
            }
        },
        t("../tool/util").inherits(h, r),
        h
    }),
    i("zrender/shape/Circle", ["require", "./Base", "../tool/util"],
    function(t) {
        "use strict";
        var e = t("./Base"),
        i = function(t) {
            e.call(this, t)
        };
        return i.prototype = {
            type: "circle",
            buildPath: function(t, e) {
                t.moveTo(e.x + e.r, e.y),
                t.arc(e.x, e.y, e.r, 0, 2 * Math.PI, !0)
            },
            getRect: function(t) {
                if (t.__rect) return t.__rect;
                var e;
                return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0,
                t.__rect = {
                    x: Math.round(t.x - t.r - e / 2),
                    y: Math.round(t.y - t.r - e / 2),
                    width: 2 * t.r + e,
                    height: 2 * t.r + e
                },
                t.__rect
            }
        },
        t("../tool/util").inherits(i, e),
        i
    }),
    i("echarts/chart/base", ["require", "zrender/shape/Image", "../util/shape/Icon", "../util/shape/MarkLine", "../util/shape/Symbol", "zrender/shape/Polyline", "zrender/shape/ShapeBundle", "../config", "../util/ecData", "../util/ecAnimation", "../util/ecEffect", "../util/accMath", "../component/base", "../layout/EdgeBundling", "zrender/tool/util", "zrender/tool/area"],
    function(t) {
        function e(t) {
            return null != t.x && null != t.y
        }
        function i(t, e, i, n, r) {
            f.call(this, t, e, i, n, r);
            var o = this;
            this.selectedMap = {},
            this.lastShapeList = [],
            this.shapeHandler = {
                onclick: function() {
                    o.isClick = !0
                },
                ondragover: function(t) {
                    var e = t.target;
                    e.highlightStyle = e.highlightStyle || {};
                    var i = e.highlightStyle,
                    n = i.brushTyep,
                    r = i.strokeColor,
                    s = i.lineWidth;
                    i.brushType = "stroke",
                    i.strokeColor = o.ecTheme.calculableColor || h.calculableColor,
                    i.lineWidth = "icon" === e.type ? 30 : 10,
                    o.zr.addHoverShape(e),
                    setTimeout(function() {
                        i && (i.brushType = n, i.strokeColor = r, i.lineWidth = s)
                    },
                    20)
                },
                ondrop: function(t) {
                    null != c.get(t.dragged, "data") && (o.isDrop = !0)
                },
                ondragend: function() {
                    o.isDragend = !0
                }
            }
        }
        var n = t("zrender/shape/Image"),
        r = t("../util/shape/Icon"),
        o = t("../util/shape/MarkLine"),
        s = t("../util/shape/Symbol"),
        a = t("zrender/shape/Polyline"),
        l = t("zrender/shape/ShapeBundle"),
        h = t("../config"),
        c = t("../util/ecData"),
        d = t("../util/ecAnimation"),
        u = t("../util/ecEffect"),
        p = t("../util/accMath"),
        f = t("../component/base"),
        g = t("../layout/EdgeBundling"),
        m = t("zrender/tool/util"),
        _ = t("zrender/tool/area");
        return i.prototype = {
            setCalculable: function(t) {
                return t.dragEnableTime = this.ecTheme.DRAG_ENABLE_TIME || h.DRAG_ENABLE_TIME,
                t.ondragover = this.shapeHandler.ondragover,
                t.ondragend = this.shapeHandler.ondragend,
                t.ondrop = this.shapeHandler.ondrop,
                t
            },
            ondrop: function(t, e) {
                if (this.isDrop && t.target && !e.dragIn) {
                    var i, n = t.target,
                    r = t.dragged,
                    o = c.get(n, "seriesIndex"),
                    s = c.get(n, "dataIndex"),
                    a = this.series,
                    l = this.component.legend;
                    if ( - 1 === s) {
                        if (c.get(r, "seriesIndex") == o) return e.dragOut = e.dragIn = e.needRefresh = !0,
                        void(this.isDrop = !1);
                        i = {
                            value: c.get(r, "value"),
                            name: c.get(r, "name")
                        },
                        this.type === h.CHART_TYPE_PIE && i.value < 0 && (i.value = 0);
                        for (var d = !1,
                        u = a[o].data, f = 0, g = u.length; g > f; f++) u[f].name === i.name && "-" === u[f].value && (a[o].data[f].value = i.value, d = !0); ! d && a[o].data.push(i),
                        l && l.add(i.name, r.style.color || r.style.strokeColor)
                    } else i = a[o].data[s] || "-",
                    null != i.value ? (a[o].data[s].value = "-" != i.value ? p.accAdd(a[o].data[s].value, c.get(r, "value")) : c.get(r, "value"), (this.type === h.CHART_TYPE_FUNNEL || this.type === h.CHART_TYPE_PIE) && (l && 1 === l.getRelatedAmount(i.name) && this.component.legend.del(i.name), i.name += this.option.nameConnector + c.get(r, "name"), l && l.add(i.name, r.style.color || r.style.strokeColor))) : a[o].data[s] = "-" != i ? p.accAdd(a[o].data[s], c.get(r, "value")) : c.get(r, "value");
                    e.dragIn = e.dragIn || !0,
                    this.isDrop = !1;
                    var m = this;
                    setTimeout(function() {
                        m.zr.trigger("mousemove", t.event)
                    },
                    300)
                }
            },
            ondragend: function(t, e) {
                if (this.isDragend && t.target && !e.dragOut) {
                    var i = t.target,
                    n = c.get(i, "seriesIndex"),
                    r = c.get(i, "dataIndex"),
                    o = this.series;
                    if (null != o[n].data[r].value) {
                        o[n].data[r].value = "-";
                        var s = o[n].data[r].name,
                        a = this.component.legend;
                        a && 0 === a.getRelatedAmount(s) && a.del(s)
                    } else o[n].data[r] = "-";
                    e.dragOut = !0,
                    e.needRefresh = !0,
                    this.isDragend = !1
                }
            },
            onlegendSelected: function(t, e) {
                var i = t.selected;
                for (var n in this.selectedMap) this.selectedMap[n] != i[n] && (e.needRefresh = !0),
                this.selectedMap[n] = i[n]
            },
            _buildPosition: function() {
                this._symbol = this.option.symbolList,
                this._sIndex2ShapeMap = {},
                this._sIndex2ColorMap = {},
                this.selectedMap = {},
                this.xMarkMap = {};
                for (var t, e, i, n, r = this.series,
                o = {
                    top: [],
                    bottom: [],
                    left: [],
                    right: [],
                    other: []
                },
                s = 0, a = r.length; a > s; s++) r[s].type === this.type && (r[s] = this.reformOption(r[s]), this.legendHoverLink = r[s].legendHoverLink || this.legendHoverLink, t = r[s].xAxisIndex, e = r[s].yAxisIndex, i = this.component.xAxis.getAxis(t), n = this.component.yAxis.getAxis(e), i.type === h.COMPONENT_TYPE_AXIS_CATEGORY ? o[i.getPosition()].push(s) : n.type === h.COMPONENT_TYPE_AXIS_CATEGORY ? o[n.getPosition()].push(s) : o.other.push(s));
                for (var l in o) o[l].length > 0 && this._buildSinglePosition(l, o[l]);
                this.addShapeList()
            },
            _buildSinglePosition: function(t, e) {
                var i = this._mapData(e),
                n = i.locationMap,
                r = i.maxDataLength;
                if (0 !== r && 0 !== n.length) {
                    switch (t) {
                    case "bottom":
                    case "top":
                        this._buildHorizontal(e, r, n, this.xMarkMap);
                        break;
                    case "left":
                    case "right":
                        this._buildVertical(e, r, n, this.xMarkMap);
                        break;
                    case "other":
                        this._buildOther(e, r, n, this.xMarkMap)
                    }
                    for (var o = 0,
                    s = e.length; s > o; o++) this.buildMark(e[o])
                }
            },
            _mapData: function(t) {
                for (var e, i, n, r, o = this.series,
                s = 0,
                a = {},
                l = "__kener__stack__",
                c = this.component.legend,
                d = [], u = 0, p = 0, f = t.length; f > p; p++) {
                    if (e = o[t[p]], n = e.name, this._sIndex2ShapeMap[t[p]] = this._sIndex2ShapeMap[t[p]] || this.query(e, "symbol") || this._symbol[p % this._symbol.length], c) {
                        if (this.selectedMap[n] = c.isSelected(n), this._sIndex2ColorMap[t[p]] = c.getColor(n), r = c.getItemShape(n)) {
                            var g = r.style;
                            if (this.type == h.CHART_TYPE_LINE) g.iconType = "legendLineIcon",
                            g.symbol = this._sIndex2ShapeMap[t[p]];
                            else if (e.itemStyle.normal.barBorderWidth > 0) {
                                var m = r.highlightStyle;
                                g.brushType = "both",
                                g.x += 1,
                                g.y += 1,
                                g.width -= 2,
                                g.height -= 2,
                                g.strokeColor = m.strokeColor = e.itemStyle.normal.barBorderColor,
                                m.lineWidth = 3
                            }
                            c.setItemShape(n, r)
                        }
                    } else this.selectedMap[n] = !0,
                    this._sIndex2ColorMap[t[p]] = this.zr.getColor(t[p]);
                    this.selectedMap[n] && (i = e.stack || l + t[p], null == a[i] ? (a[i] = s, d[s] = [t[p]], s++) : d[a[i]].push(t[p])),
                    u = Math.max(u, e.data.length)
                }
                return {
                    locationMap: d,
                    maxDataLength: u
                }
            },
            _calculMarkMapXY: function(t, e, i) {
                for (var n = this.series,
                r = 0,
                o = e.length; o > r; r++) for (var s = 0,
                a = e[r].length; a > s; s++) {
                    var l = e[r][s],
                    h = "xy" == i ? 0 : "",
                    c = this.component.grid,
                    d = t[l];
                    if ("-1" != i.indexOf("x")) {
                        d["counter" + h] > 0 && (d["average" + h] = d["sum" + h] / d["counter" + h]);
                        var u = this.component.xAxis.getAxis(n[l].xAxisIndex || 0).getCoord(d["average" + h]);
                        d["averageLine" + h] = [[u, c.getYend()], [u, c.getY()]],
                        d["minLine" + h] = [[d["minX" + h], c.getYend()], [d["minX" + h], c.getY()]],
                        d["maxLine" + h] = [[d["maxX" + h], c.getYend()], [d["maxX" + h], c.getY()]],
                        d.isHorizontal = !1
                    }
                    if (h = "xy" == i ? 1 : "", "-1" != i.indexOf("y")) {
                        d["counter" + h] > 0 && (d["average" + h] = d["sum" + h] / d["counter" + h]);
                        var p = this.component.yAxis.getAxis(n[l].yAxisIndex || 0).getCoord(d["average" + h]);
                        d["averageLine" + h] = [[c.getX(), p], [c.getXend(), p]],
                        d["minLine" + h] = [[c.getX(), d["minY" + h]], [c.getXend(), d["minY" + h]]],
                        d["maxLine" + h] = [[c.getX(), d["maxY" + h]], [c.getXend(), d["maxY" + h]]],
                        d.isHorizontal = !0
                    }
                }
            },
            addLabel: function(t, e, i, n, r) {
                var o = [i, e],
                s = this.deepMerge(o, "itemStyle.normal.label"),
                a = this.deepMerge(o, "itemStyle.emphasis.label"),
                l = s.textStyle || {},
                h = a.textStyle || {};
                if (s.show) {
                    var c = t.style;
                    c.text = this._getLabelText(e, i, n, "normal"),
                    c.textPosition = null == s.position ? "horizontal" === r ? "right": "top": s.position,
                    c.textColor = l.color,
                    c.textFont = this.getFont(l),
                    c.textAlign = l.align,
                    c.textBaseline = l.baseline
                }
                if (a.show) {
                    var d = t.highlightStyle;
                    d.text = this._getLabelText(e, i, n, "emphasis"),
                    d.textPosition = s.show ? t.style.textPosition: null == a.position ? "horizontal" === r ? "right": "top": a.position,
                    d.textColor = h.color,
                    d.textFont = this.getFont(h),
                    d.textAlign = h.align,
                    d.textBaseline = h.baseline
                }
                return t
            },
            _getLabelText: function(t, e, i, n) {
                var r = this.deepQuery([e, t], "itemStyle." + n + ".label.formatter");
                r || "emphasis" !== n || (r = this.deepQuery([e, t], "itemStyle.normal.label.formatter"));
                var o = this.getDataFromOption(e, "-");
                return r ? "function" == typeof r ? r.call(this.myChart, {
                    seriesName: t.name,
                    series: t,
                    name: i,
                    value: o,
                    data: e,
                    status: n
                }) : "string" == typeof r ? r = r.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}").replace("{a0}", t.name).replace("{b0}", i).replace("{c0}", this.numAddCommas(o)) : void 0 : o instanceof Array ? null != o[2] ? this.numAddCommas(o[2]) : o[0] + " , " + o[1] : this.numAddCommas(o)
            },
            buildMark: function(t) {
                var e = this.series[t];
                this.selectedMap[e.name] && (e.markLine && this._buildMarkLine(t), e.markPoint && this._buildMarkPoint(t))
            },
            _buildMarkPoint: function(t) {
                for (var e, i, n = (this.markAttachStyle || {})[t], r = this.series[t], o = m.clone(r.markPoint), s = 0, a = o.data.length; a > s; s++) e = o.data[s],
                i = this.getMarkCoord(t, e),
                e.x = null != e.x ? e.x: i[0],
                e.y = null != e.y ? e.y: i[1],
                !e.type || "max" !== e.type && "min" !== e.type || (e.value = i[3], e.name = e.name || e.type, e.symbolSize = e.symbolSize || _.getTextWidth(i[3], this.getFont()) / 2 + 5);
                for (var l = this._markPoint(t, o), s = 0, a = l.length; a > s; s++) {
                    var c = l[s];
                    c.zlevel = this.getZlevelBase(),
                    c.z = this.getZBase() + 1;
                    for (var d in n) c[d] = m.clone(n[d]);
                    this.shapeList.push(c)
                }
                if (this.type === h.CHART_TYPE_FORCE || this.type === h.CHART_TYPE_CHORD) for (var s = 0,
                a = l.length; a > s; s++) this.zr.addShape(l[s])
            },
            _buildMarkLine: function(t) {
                for (var e, i = (this.markAttachStyle || {})[t], n = this.series[t], r = m.clone(n.markLine), o = 0, s = r.data.length; s > o; o++) {
                    var a = r.data[o]; ! a.type || "max" !== a.type && "min" !== a.type && "average" !== a.type ? e = [this.getMarkCoord(t, a[0]), this.getMarkCoord(t, a[1])] : (e = this.getMarkCoord(t, a), r.data[o] = [m.clone(a), {}], r.data[o][0].name = a.name || a.type, r.data[o][0].value = "average" !== a.type ? e[3] : +e[3].toFixed(null != r.precision ? r.precision: this.deepQuery([this.ecTheme, h], "markLine.precision")), e = e[2], a = [{},
                    {}]),
                    null != e && null != e[0] && null != e[1] && (r.data[o][0].x = null != a[0].x ? a[0].x: e[0][0], r.data[o][0].y = null != a[0].y ? a[0].y: e[0][1], r.data[o][1].x = null != a[1].x ? a[1].x: e[1][0], r.data[o][1].y = null != a[1].y ? a[1].y: e[1][1])
                }
                var c = this._markLine(t, r),
                d = r.large;
                if (d) {
                    var u = new l({
                        style: {
                            shapeList: c
                        }
                    }),
                    p = c[0];
                    if (p) {
                        m.merge(u.style, p.style),
                        m.merge(u.highlightStyle = {},
                        p.highlightStyle),
                        u.style.brushType = "stroke",
                        u.zlevel = this.getZlevelBase(),
                        u.z = this.getZBase() + 1,
                        u.hoverable = !1;
                        for (var f in i) u[f] = m.clone(i[f])
                    }
                    this.shapeList.push(u),
                    this.zr.addShape(u),
                    u._mark = "largeLine";
                    var g = r.effect;
                    g.show && (u.effect = g)
                } else {
                    for (var o = 0,
                    s = c.length; s > o; o++) {
                        var _ = c[o];
                        _.zlevel = this.getZlevelBase(),
                        _.z = this.getZBase() + 1;
                        for (var f in i) _[f] = m.clone(i[f]);
                        this.shapeList.push(_)
                    }
                    if (this.type === h.CHART_TYPE_FORCE || this.type === h.CHART_TYPE_CHORD) for (var o = 0,
                    s = c.length; s > o; o++) this.zr.addShape(c[o])
                }
            },
            _markPoint: function(t, e) {
                var i = this.series[t],
                n = this.component;
                m.merge(m.merge(e, m.clone(this.ecTheme.markPoint || {})), m.clone(h.markPoint)),
                e.name = i.name;
                var r, o, s, a, l, d, u, p = [],
                f = e.data,
                g = n.dataRange,
                _ = n.legend,
                y = this.zr.getWidth(),
                v = this.zr.getHeight();
                if (e.large) r = this.getLargeMarkPointShape(t, e),
                r._mark = "largePoint",
                r && p.push(r);
                else for (var b = 0,
                x = f.length; x > b; b++) null != f[b].x && null != f[b].y && (s = null != f[b].value ? f[b].value: "", _ && (o = _.getColor(i.name)), g && (o = isNaN(s) ? o: g.getColor(s), a = [f[b], e], l = this.deepQuery(a, "itemStyle.normal.color") || o, d = this.deepQuery(a, "itemStyle.emphasis.color") || l, null == l && null == d) || (o = null == o ? this.zr.getColor(t) : o, f[b].tooltip = f[b].tooltip || e.tooltip || {
                    trigger: "item"
                },
                f[b].name = null != f[b].name ? f[b].name: "", f[b].value = s, r = this.getSymbolShape(e, t, f[b], b, f[b].name, this.parsePercent(f[b].x, y), this.parsePercent(f[b].y, v), "pin", o, "rgba(0,0,0,0)", "horizontal"), r._mark = "point", u = this.deepMerge([f[b], e], "effect"), u.show && (r.effect = u), i.type === h.CHART_TYPE_MAP && (r._geo = this.getMarkGeo(f[b])), c.pack(r, i, t, f[b], b, f[b].name, s), p.push(r)));
                return p
            },
            _markLine: function() {
                function t(t, e) {
                    t[e] = t[e] instanceof Array ? t[e].length > 1 ? t[e] : [t[e][0], t[e][0]] : [t[e], t[e]]
                }
                return function(i, n) {
                    var r = this.series[i],
                    o = this.component,
                    s = o.dataRange,
                    a = o.legend;
                    m.merge(m.merge(n, m.clone(this.ecTheme.markLine || {})), m.clone(h.markLine));
                    var l = a ? a.getColor(r.name) : this.zr.getColor(i);
                    t(n, "symbol"),
                    t(n, "symbolSize"),
                    t(n, "symbolRotate");
                    for (var d = n.data,
                    u = [], p = this.zr.getWidth(), f = this.zr.getHeight(), _ = 0; _ < d.length; _++) {
                        var y = d[_];
                        if (e(y[0]) && e(y[1])) {
                            var v = this.deepMerge(y),
                            b = [v, n],
                            x = l,
                            T = null != v.value ? v.value: "";
                            if (s) {
                                x = isNaN(T) ? x: s.getColor(T);
                                var w = this.deepQuery(b, "itemStyle.normal.color") || x,
                                S = this.deepQuery(b, "itemStyle.emphasis.color") || w;
                                if (null == w && null == S) continue
                            }
                            y[0].tooltip = v.tooltip || n.tooltip || {
                                trigger: "item"
                            },
                            y[0].name = y[0].name || "",
                            y[1].name = y[1].name || "",
                            y[0].value = T,
                            u.push({
                                points: [[this.parsePercent(y[0].x, p), this.parsePercent(y[0].y, f)], [this.parsePercent(y[1].x, p), this.parsePercent(y[1].y, f)]],
                                rawData: y,
                                color: x
                            })
                        }
                    }
                    var C = this.query(n, "bundling.enable");
                    if (C) {
                        var k = new g;
                        k.maxTurningAngle = this.query(n, "bundling.maxTurningAngle") / 180 * Math.PI,
                        u = k.run(u)
                    }
                    n.name = r.name;
                    for (var E = [], _ = 0, z = u.length; z > _; _++) {
                        var L = u[_],
                        M = L.rawEdge || L,
                        y = M.rawData,
                        T = null != y.value ? y.value: "",
                        A = this.getMarkLineShape(n, i, y, _, L.points, C, M.color);
                        A._mark = "line";
                        var P = this.deepMerge([y[0], y[1], n], "effect");
                        P.show && (A.effect = P, A.effect.large = n.large),
                        r.type === h.CHART_TYPE_MAP && (A._geo = [this.getMarkGeo(y[0]), this.getMarkGeo(y[1])]),
                        c.pack(A, r, i, y[0], _, y[0].name + ("" !== y[1].name ? " > " + y[1].name: ""), T),
                        E.push(A)
                    }
                    return E
                }
            } (),
            getMarkCoord: function() {
                return [0, 0]
            },
            getSymbolShape: function(t, e, i, o, s, a, l, h, d, u, p) {
                var f = [i, t],
                g = this.getDataFromOption(i, "-");
                h = this.deepQuery(f, "symbol") || h;
                var m = this.deepQuery(f, "symbolSize");
                m = "function" == typeof m ? m(g) : m,
                "number" == typeof m && (m = [m, m]);
                var _ = this.deepQuery(f, "symbolRotate"),
                y = this.deepMerge(f, "itemStyle.normal"),
                v = this.deepMerge(f, "itemStyle.emphasis"),
                b = null != y.borderWidth ? y.borderWidth: y.lineStyle && y.lineStyle.width;
                null == b && (b = h.match("empty") ? 2 : 0);
                var x = null != v.borderWidth ? v.borderWidth: v.lineStyle && v.lineStyle.width;
                null == x && (x = b + 2);
                var T = this.getItemStyleColor(y.color, e, o, i),
                w = this.getItemStyleColor(v.color, e, o, i),
                S = m[0],
                C = m[1],
                k = new r({
                    style: {
                        iconType: h.replace("empty", "").toLowerCase(),
                        x: a - S,
                        y: l - C,
                        width: 2 * S,
                        height: 2 * C,
                        brushType: "both",
                        color: h.match("empty") ? u: T || d,
                        strokeColor: y.borderColor || T || d,
                        lineWidth: b
                    },
                    highlightStyle: {
                        color: h.match("empty") ? u: w || T || d,
                        strokeColor: v.borderColor || y.borderColor || w || T || d,
                        lineWidth: x
                    },
                    clickable: this.deepQuery(f, "clickable")
                });
                return h.match("image") && (k.style.image = h.replace(new RegExp("^image:\\/\\/"), ""), k = new n({
                    style: k.style,
                    highlightStyle: k.highlightStyle,
                    clickable: this.deepQuery(f, "clickable")
                })),
                null != _ && (k.rotation = [_ * Math.PI / 180, a, l]),
                h.match("star") && (k.style.iconType = "star", k.style.n = h.replace("empty", "").replace("star", "") - 0 || 5),
                "none" === h && (k.invisible = !0, k.hoverable = !1),
                k = this.addLabel(k, t, i, s, p),
                h.match("empty") && (null == k.style.textColor && (k.style.textColor = k.style.strokeColor), null == k.highlightStyle.textColor && (k.highlightStyle.textColor = k.highlightStyle.strokeColor)),
                c.pack(k, t, e, i, o, s),
                k._x = a,
                k._y = l,
                k._dataIndex = o,
                k._seriesIndex = e,
                k
            },
            getMarkLineShape: function(t, e, i, n, r, s, l) {
                var h = null != i[0].value ? i[0].value: "-",
                c = null != i[1].value ? i[1].value: "-",
                d = [i[0].symbol || t.symbol[0], i[1].symbol || t.symbol[1]],
                u = [i[0].symbolSize || t.symbolSize[0], i[1].symbolSize || t.symbolSize[1]];
                u[0] = "function" == typeof u[0] ? u[0](h) : u[0],
                u[1] = "function" == typeof u[1] ? u[1](c) : u[1];
                var p = [this.query(i[0], "symbolRotate") || t.symbolRotate[0], this.query(i[1], "symbolRotate") || t.symbolRotate[1]],
                f = [i[0], i[1], t],
                g = this.deepMerge(f, "itemStyle.normal");
                g.color = this.getItemStyleColor(g.color, e, n, i);
                var m = this.deepMerge(f, "itemStyle.emphasis");
                m.color = this.getItemStyleColor(m.color, e, n, i);
                var _ = g.lineStyle,
                y = m.lineStyle,
                v = _.width;
                null == v && (v = g.borderWidth);
                var b = y.width;
                null == b && (b = null != m.borderWidth ? m.borderWidth: v + 2);
                var x = this.deepQuery(f, "smoothness");
                this.deepQuery(f, "smooth") || (x = 0);
                var T = s ? a: o,
                w = new T({
                    style: {
                        symbol: d,
                        symbolSize: u,
                        symbolRotate: p,
                        brushType: "both",
                        lineType: _.type,
                        shadowColor: _.shadowColor || _.color || g.borderColor || g.color || l,
                        shadowBlur: _.shadowBlur,
                        shadowOffsetX: _.shadowOffsetX,
                        shadowOffsetY: _.shadowOffsetY,
                        color: g.color || l,
                        strokeColor: _.color || g.borderColor || g.color || l,
                        lineWidth: v,
                        symbolBorderColor: g.borderColor || g.color || l,
                        symbolBorder: g.borderWidth
                    },
                    highlightStyle: {
                        shadowColor: y.shadowColor,
                        shadowBlur: y.shadowBlur,
                        shadowOffsetX: y.shadowOffsetX,
                        shadowOffsetY: y.shadowOffsetY,
                        color: m.color || g.color || l,
                        strokeColor: y.color || _.color || m.borderColor || g.borderColor || m.color || g.color || l,
                        lineWidth: b,
                        symbolBorderColor: m.borderColor || g.borderColor || m.color || g.color || l,
                        symbolBorder: null == m.borderWidth ? g.borderWidth + 2 : m.borderWidth
                    },
                    clickable: this.deepQuery(f, "clickable")
                }),
                S = w.style;
                return s ? (S.pointList = r, S.smooth = x) : (S.xStart = r[0][0], S.yStart = r[0][1], S.xEnd = r[1][0], S.yEnd = r[1][1], S.curveness = x, w.updatePoints(w.style)),
                w = this.addLabel(w, t, i[0], i[0].name + " : " + i[1].name)
            },
            getLargeMarkPointShape: function(t, e) {
                var i, n, r, o, a, l, h = this.series[t],
                c = this.component,
                d = e.data,
                u = c.dataRange,
                p = c.legend,
                f = [d[0], e];
                if (p && (n = p.getColor(h.name)), !u || (r = null != d[0].value ? d[0].value: "", n = isNaN(r) ? n: u.getColor(r), o = this.deepQuery(f, "itemStyle.normal.color") || n, a = this.deepQuery(f, "itemStyle.emphasis.color") || o, null != o || null != a)) {
                    n = this.deepMerge(f, "itemStyle.normal").color || n;
                    var g = this.deepQuery(f, "symbol") || "circle";
                    g = g.replace("empty", "").replace(/\d/g, ""),
                    l = this.deepMerge([d[0], e], "effect");
                    var m = window.devicePixelRatio || 1;
                    return i = new s({
                        style: {
                            pointList: d,
                            color: n,
                            strokeColor: n,
                            shadowColor: l.shadowColor || n,
                            shadowBlur: (null != l.shadowBlur ? l.shadowBlur: 8) * m,
                            size: this.deepQuery(f, "symbolSize"),
                            iconType: g,
                            brushType: "fill",
                            lineWidth: 1
                        },
                        draggable: !1,
                        hoverable: !1
                    }),
                    l.show && (i.effect = l),
                    i
                }
            },
            backupShapeList: function() {
                this.shapeList && this.shapeList.length > 0 ? (this.lastShapeList = this.shapeList, this.shapeList = []) : this.lastShapeList = []
            },
            addShapeList: function() {
                var t, e, i = this.option.animationThreshold / (this.canvasSupported ? 2 : 4),
                n = this.lastShapeList,
                r = this.shapeList,
                o = n.length > 0,
                s = o ? this.query(this.option, "animationDurationUpdate") : this.query(this.option, "animationDuration"),
                a = this.query(this.option, "animationEasing"),
                l = {},
                c = {};
                if (this.option.animation && !this.option.renderAsImage && r.length < i && !this.motionlessOnce) {
                    for (var d = 0,
                    u = n.length; u > d; d++) e = this._getAnimationKey(n[d]),
                    e.match("undefined") ? this.zr.delShape(n[d].id) : (e += n[d].type, l[e] ? this.zr.delShape(n[d].id) : l[e] = n[d]);
                    for (var d = 0,
                    u = r.length; u > d; d++) e = this._getAnimationKey(r[d]),
                    e.match("undefined") ? this.zr.addShape(r[d]) : (e += r[d].type, c[e] = r[d]);
                    for (e in l) c[e] || this.zr.delShape(l[e].id);
                    for (e in c) l[e] ? (this.zr.delShape(l[e].id), this._animateMod(l[e], c[e], s, a, 0, o)) : (t = this.type != h.CHART_TYPE_LINE && this.type != h.CHART_TYPE_RADAR || 0 === e.indexOf("icon") ? 0 : s / 2, this._animateMod(!1, c[e], s, a, t, o));
                    this.zr.refresh(),
                    this.animationEffect()
                } else {
                    this.motionlessOnce = !1,
                    this.zr.delShape(n);
                    for (var d = 0,
                    u = r.length; u > d; d++) this.zr.addShape(r[d])
                }
            },
            _getAnimationKey: function(t) {
                return this.type != h.CHART_TYPE_MAP && this.type != h.CHART_TYPE_TREEMAP && this.type != h.CHART_TYPE_VENN && this.type != h.CHART_TYPE_TREE ? c.get(t, "seriesIndex") + "_" + c.get(t, "dataIndex") + (t._mark ? t._mark: "") + (this.type === h.CHART_TYPE_RADAR ? c.get(t, "special") : "") : c.get(t, "seriesIndex") + "_" + c.get(t, "dataIndex") + (t._mark ? t._mark: "undefined")
            },
            _animateMod: function(t, e, i, n, r, o) {
                switch (e.type) {
                case "polyline":
                case "half-smooth-polygon":
                    d.pointList(this.zr, t, e, i, n);
                    break;
                case "rectangle":
                    d.rectangle(this.zr, t, e, i, n);
                    break;
                case "image":
                case "icon":
                    d.icon(this.zr, t, e, i, n, r);
                    break;
                case "candle":
                    o ? this.zr.addShape(e) : d.candle(this.zr, t, e, i, n);
                    break;
                case "ring":
                case "sector":
                case "circle":
                    o ? "sector" === e.type ? d.sector(this.zr, t, e, i, n) : this.zr.addShape(e) : d.ring(this.zr, t, e, i + (c.get(e, "dataIndex") || 0) % 20 * 100, n);
                    break;
                case "text":
                    d.text(this.zr, t, e, i, n);
                    break;
                case "polygon":
                    o ? d.pointList(this.zr, t, e, i, n) : d.polygon(this.zr, t, e, i, n);
                    break;
                case "ribbon":
                    d.ribbon(this.zr, t, e, i, n);
                    break;
                case "gauge-pointer":
                    d.gaugePointer(this.zr, t, e, i, n);
                    break;
                case "mark-line":
                    d.markline(this.zr, t, e, i, n);
                    break;
                case "bezier-curve":
                case "line":
                    d.line(this.zr, t, e, i, n);
                    break;
                default:
                    this.zr.addShape(e)
                }
            },
            animationMark: function(t, e, i) {
                for (var i = i || this.shapeList,
                n = 0,
                r = i.length; r > n; n++) i[n]._mark && this._animateMod(!1, i[n], t, e, 0, !0);
                this.animationEffect(i)
            },
            animationEffect: function(t) {
                if (!t && this.clearEffectShape(), t = t || this.shapeList, null != t) {
                    var e = h.EFFECT_ZLEVEL;
                    this.canvasSupported && this.zr.modLayer(e, {
                        motionBlur: !0,
                        lastFrameAlpha: .95
                    });
                    for (var i, n = 0,
                    r = t.length; r > n; n++) i = t[n],
                    i._mark && i.effect && i.effect.show && u[i._mark] && (u[i._mark](this.zr, this.effectList, i, e), this.effectList[this.effectList.length - 1]._mark = i._mark)
                }
            },
            clearEffectShape: function(t) {
                var e = this.effectList;
                if (this.zr && e && e.length > 0) {
                    t && this.zr.modLayer(h.EFFECT_ZLEVEL, {
                        motionBlur: !1
                    }),
                    this.zr.delShape(e);
                    for (var i = 0; i < e.length; i++) e[i].effectAnimator && e[i].effectAnimator.stop()
                }
                this.effectList = []
            },
            addMark: function(t, e, i) {
                var n = this.series[t];
                if (this.selectedMap[n.name]) {
                    var r = this.query(this.option, "animationDurationUpdate"),
                    o = this.query(this.option, "animationEasing"),
                    s = n[i].data,
                    a = this.shapeList.length;
                    if (n[i].data = e.data, this["_build" + i.replace("m", "M")](t), this.option.animation && !this.option.renderAsImage) this.animationMark(r, o, this.shapeList.slice(a));
                    else {
                        for (var l = a,
                        h = this.shapeList.length; h > l; l++) this.zr.addShape(this.shapeList[l]);
                        this.zr.refreshNextFrame()
                    }
                    n[i].data = s
                }
            },
            delMark: function(t, e, i) {
                i = i.replace("mark", "").replace("large", "").toLowerCase();
                var n = this.series[t];
                if (this.selectedMap[n.name]) {
                    for (var r = !1,
                    o = [this.shapeList, this.effectList], s = 2; s--;) for (var a = 0,
                    l = o[s].length; l > a; a++) if (o[s][a]._mark == i && c.get(o[s][a], "seriesIndex") == t && c.get(o[s][a], "name") == e) {
                        this.zr.delShape(o[s][a].id),
                        o[s].splice(a, 1),
                        r = !0;
                        break
                    }
                    r && this.zr.refreshNextFrame()
                }
            }
        },
        m.inherits(i, f),
        i
    }),
    i("zrender/shape/Polyline", ["require", "./Base", "./util/smoothSpline", "./util/smoothBezier", "./util/dashedLineTo", "./Polygon", "../tool/util"],
    function(t) {
        var e = t("./Base"),
        i = t("./util/smoothSpline"),
        n = t("./util/smoothBezier"),
        r = t("./util/dashedLineTo"),
        o = function(t) {
            this.brushTypeOnly = "stroke",
            this.textPosition = "end",
            e.call(this, t)
        };
        return o.prototype = {
            type: "polyline",
            buildPath: function(t, e) {
                var n = e.pointList;
                if (! (n.length < 2)) {
                    var o = Math.min(e.pointList.length, Math.round(e.pointListLength || e.pointList.length));
                    if (e.smooth && "spline" !== e.smooth) {
                        e.controlPointList || this.updateControlPoints(e);
                        var s = e.controlPointList;
                        t.moveTo(n[0][0], n[0][1]);
                        for (var a, l, h, c = 0; o - 1 > c; c++) a = s[2 * c],
                        l = s[2 * c + 1],
                        h = n[c + 1],
                        t.bezierCurveTo(a[0], a[1], l[0], l[1], h[0], h[1])
                    } else if ("spline" === e.smooth && (n = i(n), o = n.length), e.lineType && "solid" != e.lineType) {
                        if ("dashed" == e.lineType || "dotted" == e.lineType) {
                            var d = (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                            t.moveTo(n[0][0], n[0][1]);
                            for (var c = 1; o > c; c++) r(t, n[c - 1][0], n[c - 1][1], n[c][0], n[c][1], d)
                        }
                    } else {
                        t.moveTo(n[0][0], n[0][1]);
                        for (var c = 1; o > c; c++) t.lineTo(n[c][0], n[c][1])
                    }
                }
            },
            updateControlPoints: function(t) {
                t.controlPointList = n(t.pointList, t.smooth, !1, t.smoothConstraint)
            },
            getRect: function(e) {
                return t("./Polygon").prototype.getRect(e)
            }
        },
        t("../tool/util").inherits(o, e),
        o
    }),
    i("echarts/config", [],
    function() {
        var t = {
            CHART_TYPE_LINE: "line",
            CHART_TYPE_BAR: "bar",
            CHART_TYPE_SCATTER: "scatter",
            CHART_TYPE_PIE: "pie",
            CHART_TYPE_RADAR: "radar",
            CHART_TYPE_VENN: "venn",
            CHART_TYPE_TREEMAP: "treemap",
            CHART_TYPE_TREE: "tree",
            CHART_TYPE_MAP: "map",
            CHART_TYPE_K: "k",
            CHART_TYPE_ISLAND: "island",
            CHART_TYPE_FORCE: "force",
            CHART_TYPE_CHORD: "chord",
            CHART_TYPE_GAUGE: "gauge",
            CHART_TYPE_FUNNEL: "funnel",
            CHART_TYPE_EVENTRIVER: "eventRiver",
            CHART_TYPE_WORDCLOUD: "wordCloud",
            COMPONENT_TYPE_TITLE: "title",
            COMPONENT_TYPE_LEGEND: "legend",
            COMPONENT_TYPE_DATARANGE: "dataRange",
            COMPONENT_TYPE_DATAVIEW: "dataView",
            COMPONENT_TYPE_DATAZOOM: "dataZoom",
            COMPONENT_TYPE_TOOLBOX: "toolbox",
            COMPONENT_TYPE_TOOLTIP: "tooltip",
            COMPONENT_TYPE_GRID: "grid",
            COMPONENT_TYPE_AXIS: "axis",
            COMPONENT_TYPE_POLAR: "polar",
            COMPONENT_TYPE_X_AXIS: "xAxis",
            COMPONENT_TYPE_Y_AXIS: "yAxis",
            COMPONENT_TYPE_AXIS_CATEGORY: "categoryAxis",
            COMPONENT_TYPE_AXIS_VALUE: "valueAxis",
            COMPONENT_TYPE_TIMELINE: "timeline",
            COMPONENT_TYPE_ROAMCONTROLLER: "roamController",
            backgroundColor: "rgba(0,0,0,0)",
            color: ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"],
            markPoint: {
                clickable: !0,
                symbol: "pin",
                symbolSize: 10,
                large: !1,
                effect: {
                    show: !1,
                    loop: !0,
                    period: 15,
                    type: "scale",
                    scaleSize: 2,
                    bounceDistance: 10
                },
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        label: {
                            show: !0,
                            position: "inside"
                        }
                    },
                    emphasis: {
                        label: {
                            show: !0
                        }
                    }
                }
            },
            markLine: {
                clickable: !0,
                symbol: ["circle", "arrow"],
                symbolSize: [2, 4],
                smoothness: .2,
                precision: 2,
                effect: {
                    show: !1,
                    loop: !0,
                    period: 15,
                    scaleSize: 2
                },
                bundling: {
                    enable: !1,
                    maxTurningAngle: 45
                },
                itemStyle: {
                    normal: {
                        borderWidth: 1.5,
                        label: {
                            show: !0,
                            position: "end"
                        },
                        lineStyle: {
                            type: "dashed"
                        }
                    },
                    emphasis: {
                        label: {
                            show: !1
                        },
                        lineStyle: {}
                    }
                }
            },
            textStyle: {
                decoration: "none",
                fontFamily: "Arial, Verdana, sans-serif",
                fontFamily2: "微软雅黑",
                fontSize: 12,
                fontStyle: "normal",
                fontWeight: "normal"
            },
            EVENT: {
                REFRESH: "refresh",
                RESTORE: "restore",
                RESIZE: "resize",
                CLICK: "click",
                DBLCLICK: "dblclick",
                HOVER: "hover",
                MOUSEOUT: "mouseout",
                DATA_CHANGED: "dataChanged",
                DATA_ZOOM: "dataZoom",
                DATA_RANGE: "dataRange",
                DATA_RANGE_SELECTED: "dataRangeSelected",
                DATA_RANGE_HOVERLINK: "dataRangeHoverLink",
                LEGEND_SELECTED: "legendSelected",
                LEGEND_HOVERLINK: "legendHoverLink",
                MAP_SELECTED: "mapSelected",
                PIE_SELECTED: "pieSelected",
                MAGIC_TYPE_CHANGED: "magicTypeChanged",
                DATA_VIEW_CHANGED: "dataViewChanged",
                TIMELINE_CHANGED: "timelineChanged",
                MAP_ROAM: "mapRoam",
                FORCE_LAYOUT_END: "forceLayoutEnd",
                TOOLTIP_HOVER: "tooltipHover",
                TOOLTIP_IN_GRID: "tooltipInGrid",
                TOOLTIP_OUT_GRID: "tooltipOutGrid",
                ROAMCONTROLLER: "roamController"
            },
            DRAG_ENABLE_TIME: 120,
            EFFECT_ZLEVEL: 10,
            symbolList: ["circle", "rectangle", "triangle", "diamond", "emptyCircle", "emptyRectangle", "emptyTriangle", "emptyDiamond"],
            loadingEffect: "spin",
            loadingText: "数据读取中...",
            noDataEffect: "bubble",
            noDataText: "暂无数据",
            calculable: !1,
            calculableColor: "rgba(255,165,0,0.6)",
            calculableHolderColor: "#ccc",
            nameConnector: " & ",
            valueConnector: ": ",
            animation: !0,
            addDataAnimation: !0,
            animationThreshold: 2e3,
            animationDuration: 2e3,
            animationDurationUpdate: 500,
            animationEasing: "ExponentialOut"
        };
        return t
    }),
    i("zrender/tool/util", ["require", "../dep/excanvas"],
    function(t) {
        function e(t) {
            return t && 1 === t.nodeType && "string" == typeof t.nodeName
        }
        function i(t) {
            if ("object" == typeof t && null !== t) {
                var n = t;
                if (t instanceof Array) {
                    n = [];
                    for (var r = 0,
                    o = t.length; o > r; r++) n[r] = i(t[r])
                } else if (!_[y.call(t)] && !e(t)) {
                    n = {};
                    for (var s in t) t.hasOwnProperty(s) && (n[s] = i(t[s]))
                }
                return n
            }
            return t
        }
        function n(t, i, n, o) {
            if (i.hasOwnProperty(n)) {
                var s = t[n];
                "object" != typeof s || _[y.call(s)] || e(s) ? !o && n in t || (t[n] = i[n]) : r(t[n], i[n], o)
            }
        }
        function r(t, e, i) {
            for (var r in e) n(t, e, r, i);
            return t
        }
        function o() {
            if (!u) if (t("../dep/excanvas"), window.G_vmlCanvasManager) {
                var e = document.createElement("div");
                e.style.position = "absolute",
                e.style.top = "-1000px",
                document.body.appendChild(e),
                u = G_vmlCanvasManager.initElement(e).getContext("2d")
            } else u = document.createElement("canvas").getContext("2d");
            return u
        }
        function s(t, e) {
            if (t.indexOf) return t.indexOf(e);
            for (var i = 0,
            n = t.length; n > i; i++) if (t[i] === e) return i;
            return - 1
        }
        function a(t, e) {
            function i() {}
            var n = t.prototype;
            i.prototype = e.prototype,
            t.prototype = new i;
            for (var r in n) t.prototype[r] = n[r];
            t.constructor = t
        }
        function l(t, e, i) {
            if (t && e) if (t.forEach && t.forEach === f) t.forEach(e, i);
            else if (t.length === +t.length) for (var n = 0,
            r = t.length; r > n; n++) e.call(i, t[n], n, t);
            else for (var o in t) t.hasOwnProperty(o) && e.call(i, t[o], o, t)
        }
        function h(t, e, i) {
            if (t && e) {
                if (t.map && t.map === g) return t.map(e, i);
                for (var n = [], r = 0, o = t.length; o > r; r++) n.push(e.call(i, t[r], r, t));
                return n
            }
        }
        function c(t, e, i) {
            if (t && e) {
                if (t.filter && t.filter === m) return t.filter(e, i);
                for (var n = [], r = 0, o = t.length; o > r; r++) e.call(i, t[r], r, t) && n.push(t[r]);
                return n
            }
        }
        function d(t, e) {
            return function() {
                t.apply(e, arguments)
            }
        }
        var u, p = Array.prototype,
        f = p.forEach,
        g = p.map,
        m = p.filter,
        _ = {
            "[object Function]": 1,
            "[object RegExp]": 1,
            "[object Date]": 1,
            "[object Error]": 1,
            "[object CanvasGradient]": 1
        },
        y = Object.prototype.toString;
        return {
            inherits: a,
            clone: i,
            merge: r,
            getContext: o,
            indexOf: s,
            each: l,
            map: h,
            filter: c,
            bind: d
        }
    }),
    i("echarts/util/ecData", [],
    function() {
        function t(t, e, i, n, r, o, s, a) {
            var l;
            return "undefined" != typeof n && (l = null == n.value ? n: n.value),
            t._echartsData = {
                _series: e,
                _seriesIndex: i,
                _data: n,
                _dataIndex: r,
                _name: o,
                _value: l,
                _special: s,
                _special2: a
            },
            t._echartsData
        }
        function e(t, e) {
            var i = t._echartsData;
            if (!e) return i;
            switch (e) {
            case "series":
            case "seriesIndex":
            case "data":
            case "dataIndex":
            case "name":
            case "value":
            case "special":
            case "special2":
                return i && i["_" + e]
            }
            return null
        }
        function i(t, e, i) {
            switch (t._echartsData = t._echartsData || {},
            e) {
            case "series":
            case "seriesIndex":
            case "data":
            case "dataIndex":
            case "name":
            case "value":
            case "special":
            case "special2":
                t._echartsData["_" + e] = i
            }
        }
        function n(t, e) {
            e._echartsData = {
                _series: t._echartsData._series,
                _seriesIndex: t._echartsData._seriesIndex,
                _data: t._echartsData._data,
                _dataIndex: t._echartsData._dataIndex,
                _name: t._echartsData._name,
                _value: t._echartsData._value,
                _special: t._echartsData._special,
                _special2: t._echartsData._special2
            }
        }
        return {
            pack: t,
            set: i,
            get: e,
            clone: n
        }
    }),
    i("zrender/tool/math", [],
    function() {
        function t(t, e) {
            return Math.sin(e ? t * r: t)
        }
        function e(t, e) {
            return Math.cos(e ? t * r: t)
        }
        function i(t) {
            return t * r
        }
        function n(t) {
            return t / r
        }
        var r = Math.PI / 180;
        return {
            sin: t,
            cos: e,
            degreeToRadian: i,
            radianToDegree: n
        }
    }),
    i("zrender/tool/color", ["require", "../tool/util"],
    function(t) {
        function e(t) {
            $ = t
        }
        function i() {
            $ = Y
        }
        function n(t, e) {
            return t = 0 | t,
            e = e || $,
            e[t % e.length]
        }
        function r(t) {
            q = t
        }
        function o() {
            V = q
        }
        function s() {
            return q
        }
        function a(t, e, i, n, r, o, s) {
            N || (N = W.getContext());
            for (var a = N.createRadialGradient(t, e, i, n, r, o), l = 0, h = s.length; h > l; l++) a.addColorStop(s[l][0], s[l][1]);
            return a.__nonRecursion = !0,
            a
        }
        function l(t, e, i, n, r) {
            N || (N = W.getContext());
            for (var o = N.createLinearGradient(t, e, i, n), s = 0, a = r.length; a > s; s++) o.addColorStop(r[s][0], r[s][1]);
            return o.__nonRecursion = !0,
            o
        }
        function h(t, e, i) {
            t = f(t),
            e = f(e),
            t = M(t),
            e = M(e);
            for (var n = [], r = (e[0] - t[0]) / i, o = (e[1] - t[1]) / i, s = (e[2] - t[2]) / i, a = (e[3] - t[3]) / i, l = 0, h = t[0], c = t[1], u = t[2], p = t[3]; i > l; l++) n[l] = d([I(Math.floor(h), [0, 255]), I(Math.floor(c), [0, 255]), I(Math.floor(u), [0, 255]), p.toFixed(4) - 0], "rgba"),
            h += r,
            c += o,
            u += s,
            p += a;
            return h = e[0],
            c = e[1],
            u = e[2],
            p = e[3],
            n[l] = d([h, c, u, p], "rgba"),
            n
        }
        function c(t, e) {
            var i = [],
            n = t.length;
            if (void 0 === e && (e = 20), 1 === n) i = h(t[0], t[0], e);
            else if (n > 1) for (var r = 0,
            o = n - 1; o > r; r++) {
                var s = h(t[r], t[r + 1], e);
                o - 1 > r && s.pop(),
                i = i.concat(s)
            }
            return i
        }
        function d(t, e) {
            if (e = e || "rgb", t && (3 === t.length || 4 === t.length)) {
                if (t = P(t,
                function(t) {
                    return t > 1 ? Math.ceil(t) : t
                }), e.indexOf("hex") > -1) return "#" + ((1 << 24) + (t[0] << 16) + (t[1] << 8) + +t[2]).toString(16).slice(1);
                if (e.indexOf("hs") > -1) {
                    var i = P(t.slice(1, 3),
                    function(t) {
                        return t + "%"
                    });
                    t[1] = i[0],
                    t[2] = i[1]
                }
                return e.indexOf("a") > -1 ? (3 === t.length && t.push(1), t[3] = I(t[3], [0, 1]), e + "(" + t.slice(0, 4).join(",") + ")") : e + "(" + t.slice(0, 3).join(",") + ")"
            }
        }
        function u(t) {
            t = S(t),
            t.indexOf("rgba") < 0 && (t = f(t));
            var e = [],
            i = 0;
            return t.replace(/[\d.]+/g,
            function(t) {
                t = 3 > i ? 0 | t: +t,
                e[i++] = t
            }),
            e
        }
        function p(t, e) {
            if (!R(t)) return t;
            var i = M(t),
            n = i[3];
            return "undefined" == typeof n && (n = 1),
            t.indexOf("hsb") > -1 ? i = O(i) : t.indexOf("hsl") > -1 && (i = D(i)),
            e.indexOf("hsb") > -1 || e.indexOf("hsv") > -1 ? i = B(i) : e.indexOf("hsl") > -1 && (i = F(i)),
            i[3] = n,
            d(i, e)
        }
        function f(t) {
            return p(t, "rgba")
        }
        function g(t) {
            return p(t, "rgb")
        }
        function m(t) {
            return p(t, "hex")
        }
        function _(t) {
            return p(t, "hsva")
        }
        function y(t) {
            return p(t, "hsv")
        }
        function v(t) {
            return p(t, "hsba")
        }
        function b(t) {
            return p(t, "hsb")
        }
        function x(t) {
            return p(t, "hsla")
        }
        function T(t) {
            return p(t, "hsl")
        }
        function w(t) {
            for (var e in j) if (m(j[e]) === m(t)) return e;
            return null
        }
        function S(t) {
            return String(t).replace(/\s+/g, "")
        }
        function C(t) {
            if (j[t] && (t = j[t]), t = S(t), t = t.replace(/hsv/i, "hsb"), /^#[\da-f]{3}$/i.test(t)) {
                t = parseInt(t.slice(1), 16);
                var e = (3840 & t) << 8,
                i = (240 & t) << 4,
                n = 15 & t;
                t = "#" + ((1 << 24) + (e << 4) + e + (i << 4) + i + (n << 4) + n).toString(16).slice(1)
            }
            return t
        }
        function k(t, e) {
            if (!R(t)) return t;
            var i = e > 0 ? 1 : -1;
            "undefined" == typeof e && (e = 0),
            e = Math.abs(e) > 1 ? 1 : Math.abs(e),
            t = g(t);
            for (var n = M(t), r = 0; 3 > r; r++) n[r] = 1 === i ? n[r] * (1 - e) | 0 : (255 - n[r]) * e + n[r] | 0;
            return "rgb(" + n.join(",") + ")"
        }
        function E(t) {
            if (!R(t)) return t;
            var e = M(f(t));
            return e = P(e,
            function(t) {
                return 255 - t
            }),
            d(e, "rgb")
        }
        function z(t, e, i) {
            if (!R(t) || !R(e)) return t;
            "undefined" == typeof i && (i = .5),
            i = 1 - I(i, [0, 1]);
            for (var n = 2 * i - 1,
            r = M(f(t)), o = M(f(e)), s = r[3] - o[3], a = ((n * s === -1 ? n: (n + s) / (1 + n * s)) + 1) / 2, l = 1 - a, h = [], c = 0; 3 > c; c++) h[c] = r[c] * a + o[c] * l;
            var u = r[3] * i + o[3] * (1 - i);
            return u = Math.max(0, Math.min(1, u)),
            1 === r[3] && 1 === o[3] ? d(h, "rgb") : (h[3] = u, d(h, "rgba"))
        }
        function L() {
            return "#" + (Math.random().toString(16) + "0000").slice(2, 8)
        }
        function M(t) {
            t = C(t);
            var e = t.match(G);
            if (null === e) throw new Error("The color format error");
            var i, n, r, o = [];
            if (e[2]) i = e[2].replace("#", "").split(""),
            r = [i[0] + i[1], i[2] + i[3], i[4] + i[5]],
            o = P(r,
            function(t) {
                return I(parseInt(t, 16), [0, 255])
            });
            else if (e[4]) {
                var s = e[4].split(",");
                n = s[3],
                r = s.slice(0, 3),
                o = P(r,
                function(t) {
                    return t = Math.floor(t.indexOf("%") > 0 ? 2.55 * parseInt(t, 0) : t),
                    I(t, [0, 255])
                }),
                "undefined" != typeof n && o.push(I(parseFloat(n), [0, 1]))
            } else if (e[5] || e[6]) {
                var a = (e[5] || e[6]).split(","),
                l = parseInt(a[0], 0) / 360,
                h = a[1],
                c = a[2];
                n = a[3],
                o = P([h, c],
                function(t) {
                    return I(parseFloat(t) / 100, [0, 1])
                }),
                o.unshift(l),
                "undefined" != typeof n && o.push(I(parseFloat(n), [0, 1]))
            }
            return o
        }
        function A(t, e) {
            if (!R(t)) return t;
            null === e && (e = 1);
            var i = M(f(t));
            return i[3] = I(Number(e).toFixed(4), [0, 1]),
            d(i, "rgba")
        }
        function P(t, e) {
            if ("function" != typeof e) throw new TypeError;
            for (var i = t ? t.length: 0, n = 0; i > n; n++) t[n] = e(t[n]);
            return t
        }
        function I(t, e) {
            return t <= e[0] ? t = e[0] : t >= e[1] && (t = e[1]),
            t
        }
        function R(t) {
            return t instanceof Array || "string" == typeof t
        }
        function O(t) {
            var e, i, n, r = t[0],
            o = t[1],
            s = t[2];
            if (0 === o) e = 255 * s,
            i = 255 * s,
            n = 255 * s;
            else {
                var a = 6 * r;
                6 === a && (a = 0);
                var l = 0 | a,
                h = s * (1 - o),
                c = s * (1 - o * (a - l)),
                d = s * (1 - o * (1 - (a - l))),
                u = 0,
                p = 0,
                f = 0;
                0 === l ? (u = s, p = d, f = h) : 1 === l ? (u = c, p = s, f = h) : 2 === l ? (u = h, p = s, f = d) : 3 === l ? (u = h, p = c, f = s) : 4 === l ? (u = d, p = h, f = s) : (u = s, p = h, f = c),
                e = 255 * u,
                i = 255 * p,
                n = 255 * f
            }
            return [e, i, n]
        }
        function D(t) {
            var e, i, n, r = t[0],
            o = t[1],
            s = t[2];
            if (0 === o) e = 255 * s,
            i = 255 * s,
            n = 255 * s;
            else {
                var a;
                a = .5 > s ? s * (1 + o) : s + o - o * s;
                var l = 2 * s - a;
                e = 255 * H(l, a, r + 1 / 3),
                i = 255 * H(l, a, r),
                n = 255 * H(l, a, r - 1 / 3)
            }
            return [e, i, n]
        }
        function H(t, e, i) {
            return 0 > i && (i += 1),
            i > 1 && (i -= 1),
            1 > 6 * i ? t + 6 * (e - t) * i: 1 > 2 * i ? e: 2 > 3 * i ? t + (e - t) * (2 / 3 - i) * 6 : t
        }
        function B(t) {
            var e, i, n = t[0] / 255,
            r = t[1] / 255,
            o = t[2] / 255,
            s = Math.min(n, r, o),
            a = Math.max(n, r, o),
            l = a - s,
            h = a;
            if (0 === l) e = 0,
            i = 0;
            else {
                i = l / a;
                var c = ((a - n) / 6 + l / 2) / l,
                d = ((a - r) / 6 + l / 2) / l,
                u = ((a - o) / 6 + l / 2) / l;
                n === a ? e = u - d: r === a ? e = 1 / 3 + c - u: o === a && (e = 2 / 3 + d - c),
                0 > e && (e += 1),
                e > 1 && (e -= 1)
            }
            return e = 360 * e,
            i = 100 * i,
            h = 100 * h,
            [e, i, h]
        }
        function F(t) {
            var e, i, n = t[0] / 255,
            r = t[1] / 255,
            o = t[2] / 255,
            s = Math.min(n, r, o),
            a = Math.max(n, r, o),
            l = a - s,
            h = (a + s) / 2;
            if (0 === l) e = 0,
            i = 0;
            else {
                i = .5 > h ? l / (a + s) : l / (2 - a - s);
                var c = ((a - n) / 6 + l / 2) / l,
                d = ((a - r) / 6 + l / 2) / l,
                u = ((a - o) / 6 + l / 2) / l;
                n === a ? e = u - d: r === a ? e = 1 / 3 + c - u: o === a && (e = 2 / 3 + d - c),
                0 > e && (e += 1),
                e > 1 && (e -= 1)
            }
            return e = 360 * e,
            i = 100 * i,
            h = 100 * h,
            [e, i, h]
        }
        var N, W = t("../tool/util"),
        $ = ["#ff9277", " #dddd00", " #ffc877", " #bbe3ff", " #d5ffbb", "#bbbbff", " #ddb000", " #b0dd00", " #e2bbff", " #ffbbe3", "#ff7777", " #ff9900", " #83dd00", " #77e3ff", " #778fff", "#c877ff", " #ff77ab", " #ff6600", " #aa8800", " #77c7ff", "#ad77ff", " #ff77ff", " #dd0083", " #777700", " #00aa00", "#0088aa", " #8400dd", " #aa0088", " #dd0000", " #772e00"],
        Y = $,
        q = "rgba(255,255,0,0.5)",
        V = q,
        G = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        j = {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#0ff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000",
            blanchedalmond: "#ffebcd",
            blue: "#00f",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#0ff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgrey: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkslategrey: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#f0f",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            grey: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgrey: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#789",
            lightslategrey: "#789",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#0f0",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#f0f",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370d8",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#d87093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#f00",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#fff",
            whitesmoke: "#f5f5f5",
            yellow: "#ff0",
            yellowgreen: "#9acd32"
        };
        return {
            customPalette: e,
            resetPalette: i,
            getColor: n,
            getHighlightColor: s,
            customHighlight: r,
            resetHighlight: o,
            getRadialGradient: a,
            getLinearGradient: l,
            getGradientColors: c,
            getStepColors: h,
            reverse: E,
            mix: z,
            lift: k,
            trim: S,
            random: L,
            toRGB: g,
            toRGBA: f,
            toHex: m,
            toHSL: T,
            toHSLA: x,
            toHSB: b,
            toHSBA: v,
            toHSV: y,
            toHSVA: _,
            toName: w,
            toColor: d,
            toArray: u,
            alpha: A,
            getData: M
        }
    }),
    i("echarts/chart", [],
    function() {
        var t = {},
        e = {};
        return t.define = function(i, n) {
            return e[i] = n,
            t
        },
        t.get = function(t) {
            return e[t]
        },
        t
    }),
    i("zrender/tool/event", ["require", "../mixin/Eventful"],
    function(t) {
        "use strict";
        function e(t) {
            return "undefined" != typeof t.zrenderX && t.zrenderX || "undefined" != typeof t.offsetX && t.offsetX || "undefined" != typeof t.layerX && t.layerX || "undefined" != typeof t.clientX && t.clientX
        }
        function i(t) {
            return "undefined" != typeof t.zrenderY && t.zrenderY || "undefined" != typeof t.offsetY && t.offsetY || "undefined" != typeof t.layerY && t.layerY || "undefined" != typeof t.clientY && t.clientY
        }
        function n(t) {
            return "undefined" != typeof t.zrenderDelta && t.zrenderDelta || "undefined" != typeof t.wheelDelta && t.wheelDelta || "undefined" != typeof t.detail && -t.detail
        }
        var r = t("../mixin/Eventful"),
        o = "function" == typeof window.addEventListener ?
        function(t) {
            t.preventDefault(),
            t.stopPropagation(),
            t.cancelBubble = !0
        }: function(t) {
            t.returnValue = !1,
            t.cancelBubble = !0
        };
        return {
            getX: e,
            getY: i,
            getDelta: n,
            stop: o,
            Dispatcher: r
        }
    }),
    i("zrender/tool/env", [],
    function() {
        function t(t) {
            var e = this.os = {},
            i = this.browser = {},
            n = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
            r = t.match(/(Android);?[\s\/]+([\d.]+)?/),
            o = t.match(/(iPad).*OS\s([\d_]+)/),
            s = t.match(/(iPod)(.*OS\s([\d_]+))?/),
            a = !o && t.match(/(iPhone\sOS)\s([\d_]+)/),
            l = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            h = l && t.match(/TouchPad/),
            c = t.match(/Kindle\/([\d.]+)/),
            d = t.match(/Silk\/([\d._]+)/),
            u = t.match(/(BlackBerry).*Version\/([\d.]+)/),
            p = t.match(/(BB10).*Version\/([\d.]+)/),
            f = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
            g = t.match(/PlayBook/),
            m = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
            _ = t.match(/Firefox\/([\d.]+)/),
            y = t.match(/MSIE ([\d.]+)/),
            v = n && t.match(/Mobile\//) && !m,
            b = t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !m,
            y = t.match(/MSIE\s([\d.]+)/);
            return (i.webkit = !!n) && (i.version = n[1]),
            r && (e.android = !0, e.version = r[2]),
            a && !s && (e.ios = e.iphone = !0, e.version = a[2].replace(/_/g, ".")),
            o && (e.ios = e.ipad = !0, e.version = o[2].replace(/_/g, ".")),
            s && (e.ios = e.ipod = !0, e.version = s[3] ? s[3].replace(/_/g, ".") : null),
            l && (e.webos = !0, e.version = l[2]),
            h && (e.touchpad = !0),
            u && (e.blackberry = !0, e.version = u[2]),
            p && (e.bb10 = !0, e.version = p[2]),
            f && (e.rimtabletos = !0, e.version = f[2]),
            g && (i.playbook = !0),
            c && (e.kindle = !0, e.version = c[1]),
            d && (i.silk = !0, i.version = d[1]),
            !d && e.android && t.match(/Kindle Fire/) && (i.silk = !0),
            m && (i.chrome = !0, i.version = m[1]),
            _ && (i.firefox = !0, i.version = _[1]),
            y && (i.ie = !0, i.version = y[1]),
            v && (t.match(/Safari/) || e.ios) && (i.safari = !0),
            b && (i.webview = !0),
            y && (i.ie = !0, i.version = y[1]),
            e.tablet = !!(o || g || r && !t.match(/Mobile/) || _ && t.match(/Tablet/) || y && !t.match(/Phone/) && t.match(/Touch/)),
            e.phone = !(e.tablet || e.ipod || !(r || a || l || u || p || m && t.match(/Android/) || m && t.match(/CriOS\/([\d.]+)/) || _ && t.match(/Mobile/) || y && t.match(/Touch/))),
            {
                browser: i,
                os: e,
                canvasSupported: document.createElement("canvas").getContext ? !0 : !1
            }
        }
        return t(navigator.userAgent)
    }),
    i("zrender/zrender", ["require", "./dep/excanvas", "./tool/util", "./tool/log", "./tool/guid", "./Handler", "./Painter", "./Storage", "./animation/Animation", "./tool/env"],
    function(t) {
        function e(t) {
            return function() {
                t._needsRefreshNextFrame && t.refresh()
            }
        }
        t("./dep/excanvas");
        var i = t("./tool/util"),
        n = t("./tool/log"),
        r = t("./tool/guid"),
        o = t("./Handler"),
        s = t("./Painter"),
        a = t("./Storage"),
        l = t("./animation/Animation"),
        h = {},
        c = {};
        c.version = "2.0.9",
        c.init = function(t) {
            var e = new d(r(), t);
            return h[e.id] = e,
            e
        },
        c.dispose = function(t) {
            if (t) t.dispose();
            else {
                for (var e in h) h[e].dispose();
                h = {}
            }
            return c
        },
        c.getInstance = function(t) {
            return h[t]
        },
        c.delInstance = function(t) {
            return delete h[t],
            c
        };
        var d = function(i, n) {
            this.id = i,
            this.env = t("./tool/env"),
            this.storage = new a,
            this.painter = new s(n, this.storage),
            this.handler = new o(n, this.storage, this.painter),
            this.animation = new l({
                stage: {
                    update: e(this)
                }
            }),
            this.animation.start();
            var r = this;
            this.painter.refreshNextFrame = function() {
                r.refreshNextFrame()
            },
            this._needsRefreshNextFrame = !1;
            var r = this,
            h = this.storage,
            c = h.delFromMap;
            h.delFromMap = function(t) {
                var e = h.get(t);
                r.stopAnimation(e),
                c.call(h, t)
            }
        };
        return d.prototype.getId = function() {
            return this.id
        },
        d.prototype.addShape = function(t) {
            return this.addElement(t),
            this
        },
        d.prototype.addGroup = function(t) {
            return this.addElement(t),
            this
        },
        d.prototype.delShape = function(t) {
            return this.delElement(t),
            this
        },
        d.prototype.delGroup = function(t) {
            return this.delElement(t),
            this
        },
        d.prototype.modShape = function(t, e) {
            return this.modElement(t, e),
            this
        },
        d.prototype.modGroup = function(t, e) {
            return this.modElement(t, e),
            this
        },
        d.prototype.addElement = function(t) {
            return this.storage.addRoot(t),
            this._needsRefreshNextFrame = !0,
            this
        },
        d.prototype.delElement = function(t) {
            return this.storage.delRoot(t),
            this._needsRefreshNextFrame = !0,
            this
        },
        d.prototype.modElement = function(t, e) {
            return this.storage.mod(t, e),
            this._needsRefreshNextFrame = !0,
            this
        },
        d.prototype.modLayer = function(t, e) {
            return this.painter.modLayer(t, e),
            this._needsRefreshNextFrame = !0,
            this
        },
        d.prototype.addHoverShape = function(t) {
            return this.storage.addHover(t),
            this
        },
        d.prototype.render = function(t) {
            return this.painter.render(t),
            this._needsRefreshNextFrame = !1,
            this
        },
        d.prototype.refresh = function(t) {
            return this.painter.refresh(t),
            this._needsRefreshNextFrame = !1,
            this
        },
        d.prototype.refreshNextFrame = function() {
            return this._needsRefreshNextFrame = !0,
            this
        },
        d.prototype.refreshHover = function(t) {
            return this.painter.refreshHover(t),
            this
        },
        d.prototype.refreshShapes = function(t, e) {
            return this.painter.refreshShapes(t, e),
            this
        },
        d.prototype.resize = function() {
            return this.painter.resize(),
            this
        },
        d.prototype.animate = function(t, e, r) {
            var o = this;
            if ("string" == typeof t && (t = this.storage.get(t)), t) {
                var s;
                if (e) {
                    for (var a = e.split("."), l = t, h = 0, c = a.length; c > h; h++) l && (l = l[a[h]]);
                    l && (s = l)
                } else s = t;
                if (!s) return void n('Property "' + e + '" is not existed in element ' + t.id);
                null == t.__animators && (t.__animators = []);
                var d = t.__animators,
                u = this.animation.animate(s, {
                    loop: r
                }).during(function() {
                    o.modShape(t)
                }).done(function() {
                    var e = i.indexOf(t.__animators, u);
                    e >= 0 && d.splice(e, 1)
                });
                return d.push(u),
                u
            }
            n("Element not existed")
        },
        d.prototype.stopAnimation = function(t) {
            if (t.__animators) {
                for (var e = t.__animators,
                i = e.length,
                n = 0; i > n; n++) e[n].stop();
                e.length = 0
            }
            return this
        },
        d.prototype.clearAnimation = function() {
            return this.animation.clear(),
            this
        },
        d.prototype.showLoading = function(t) {
            return this.painter.showLoading(t),
            this
        },
        d.prototype.hideLoading = function() {
            return this.painter.hideLoading(),
            this
        },
        d.prototype.getWidth = function() {
            return this.painter.getWidth()
        },
        d.prototype.getHeight = function() {
            return this.painter.getHeight()
        },
        d.prototype.toDataURL = function(t, e, i) {
            return this.painter.toDataURL(t, e, i)
        },
        d.prototype.shapeToImage = function(t, e, i) {
            var n = r();
            return this.painter.shapeToImage(n, t, e, i)
        },
        d.prototype.on = function(t, e, i) {
            return this.handler.on(t, e, i),
            this
        },
        d.prototype.un = function(t, e) {
            return this.handler.un(t, e),
            this
        },
        d.prototype.trigger = function(t, e) {
            return this.handler.trigger(t, e),
            this
        },
        d.prototype.clear = function() {
            return this.storage.delRoot(),
            this.painter.clear(),
            this
        },
        d.prototype.dispose = function() {
            this.animation.stop(),
            this.clear(),
            this.storage.dispose(),
            this.painter.dispose(),
            this.handler.dispose(),
            this.animation = this.storage = this.painter = this.handler = null,
            c.delInstance(this.id)
        },
        c
    }),
    i("zrender/config", [],
    function() {
        var t = {
            EVENT: {
                RESIZE: "resize",
                CLICK: "click",
                DBLCLICK: "dblclick",
                MOUSEWHEEL: "mousewheel",
                MOUSEMOVE: "mousemove",
                MOUSEOVER: "mouseover",
                MOUSEOUT: "mouseout",
                MOUSEDOWN: "mousedown",
                MOUSEUP: "mouseup",
                GLOBALOUT: "globalout",
                DRAGSTART: "dragstart",
                DRAGEND: "dragend",
                DRAGENTER: "dragenter",
                DRAGOVER: "dragover",
                DRAGLEAVE: "dragleave",
                DROP: "drop",
                touchClickDelay: 300
            },
            catchBrushException: !1,
            debugMode: 0,
            devicePixelRatio: Math.max(window.devicePixelRatio || 1, 1)
        };
        return t
    }),
    i("echarts/chart/island", ["require", "./base", "zrender/shape/Circle", "../config", "../util/ecData", "zrender/tool/util", "zrender/tool/event", "zrender/tool/color", "../util/accMath", "../chart"],
    function(t) {
        function e(t, e, n, r, s) {
            i.call(this, t, e, n, r, s),
            this._nameConnector,
            this._valueConnector,
            this._zrHeight = this.zr.getHeight(),
            this._zrWidth = this.zr.getWidth();
            var l = this;
            l.shapeHandler.onmousewheel = function(t) {
                var e = t.target,
                i = t.event,
                n = a.getDelta(i);
                n = n > 0 ? -1 : 1,
                e.style.r -= n,
                e.style.r = e.style.r < 5 ? 5 : e.style.r;
                var r = o.get(e, "value"),
                s = r * l.option.island.calculateStep;
                r = s > 1 ? Math.round(r - s * n) : +(r - s * n).toFixed(2);
                var h = o.get(e, "name");
                e.style.text = h + ":" + r,
                o.set(e, "value", r),
                o.set(e, "name", h),
                l.zr.modShape(e.id),
                l.zr.refreshNextFrame(),
                a.stop(i)
            }
        }
        var i = t("./base"),
        n = t("zrender/shape/Circle"),
        r = t("../config");
        r.island = {
            zlevel: 0,
            z: 5,
            r: 15,
            calculateStep: .1
        };
        var o = t("../util/ecData"),
        s = t("zrender/tool/util"),
        a = t("zrender/tool/event");
        return e.prototype = {
            type: r.CHART_TYPE_ISLAND,
            _combine: function(e, i) {
                var n = t("zrender/tool/color"),
                r = t("../util/accMath"),
                s = r.accAdd(o.get(e, "value"), o.get(i, "value")),
                a = o.get(e, "name") + this._nameConnector + o.get(i, "name");
                e.style.text = a + this._valueConnector + s,
                o.set(e, "value", s),
                o.set(e, "name", a),
                e.style.r = this.option.island.r,
                e.style.color = n.mix(e.style.color, i.style.color)
            },
            refresh: function(t) {
                t && (t.island = this.reformOption(t.island), this.option = t, this._nameConnector = this.option.nameConnector, this._valueConnector = this.option.valueConnector)
            },
            getOption: function() {
                return this.option
            },
            resize: function() {
                var t = this.zr.getWidth(),
                e = this.zr.getHeight(),
                i = t / (this._zrWidth || t),
                n = e / (this._zrHeight || e);
                if (1 !== i || 1 !== n) {
                    this._zrWidth = t,
                    this._zrHeight = e;
                    for (var r = 0,
                    o = this.shapeList.length; o > r; r++) this.zr.modShape(this.shapeList[r].id, {
                        style: {
                            x: Math.round(this.shapeList[r].style.x * i),
                            y: Math.round(this.shapeList[r].style.y * n)
                        }
                    })
                }
            },
            add: function(t) {
                var e = o.get(t, "name"),
                i = o.get(t, "value"),
                r = null != o.get(t, "series") ? o.get(t, "series").name: "",
                s = this.getFont(this.option.island.textStyle),
                a = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                        x: t.style.x,
                        y: t.style.y,
                        r: this.option.island.r,
                        color: t.style.color || t.style.strokeColor,
                        text: e + this._valueConnector + i,
                        textFont: s
                    },
                    draggable: !0,
                    hoverable: !0,
                    onmousewheel: this.shapeHandler.onmousewheel,
                    _type: "island"
                };
                "#fff" === a.style.color && (a.style.color = t.style.strokeColor),
                this.setCalculable(a),
                a.dragEnableTime = 0,
                o.pack(a, {
                    name: r
                },
                -1, i, -1, e),
                a = new n(a),
                this.shapeList.push(a),
                this.zr.addShape(a)
            },
            del: function(t) {
                this.zr.delShape(t.id);
                for (var e = [], i = 0, n = this.shapeList.length; n > i; i++) this.shapeList[i].id != t.id && e.push(this.shapeList[i]);
                this.shapeList = e
            },
            ondrop: function(t, e) {
                if (this.isDrop && t.target) {
                    var i = t.target,
                    n = t.dragged;
                    this._combine(i, n),
                    this.zr.modShape(i.id),
                    e.dragIn = !0,
                    this.isDrop = !1
                }
            },
            ondragend: function(t, e) {
                var i = t.target;
                this.isDragend ? e.dragIn && (this.del(i), e.needRefresh = !0) : e.dragIn || (i.style.x = a.getX(t.event), i.style.y = a.getY(t.event), this.add(i), e.needRefresh = !0),
                this.isDragend = !1
            }
        },
        s.inherits(e, i),
        t("../chart").define("island", e),
        e
    }),
    i("echarts/component/toolbox", ["require", "./base", "zrender/shape/Line", "zrender/shape/Image", "zrender/shape/Rectangle", "../util/shape/Icon", "../config", "zrender/tool/util", "zrender/config", "zrender/tool/event", "./dataView", "../component"],
    function(t) {
        function e(t, e, n, r, o) {
            i.call(this, t, e, n, r, o),
            this.dom = o.dom,
            this._magicType = {},
            this._magicMap = {},
            this._isSilence = !1,
            this._iconList,
            this._iconShapeMap = {},
            this._featureTitle = {},
            this._featureIcon = {},
            this._featureColor = {},
            this._featureOption = {},
            this._enableColor = "red",
            this._disableColor = "#ccc",
            this._markShapeList = [];
            var s = this;
            s._onMark = function(t) {
                s.__onMark(t)
            },
            s._onMarkUndo = function(t) {
                s.__onMarkUndo(t)
            },
            s._onMarkClear = function(t) {
                s.__onMarkClear(t)
            },
            s._onDataZoom = function(t) {
                s.__onDataZoom(t)
            },
            s._onDataZoomReset = function(t) {
                s.__onDataZoomReset(t)
            },
            s._onDataView = function(t) {
                s.__onDataView(t)
            },
            s._onRestore = function(t) {
                s.__onRestore(t)
            },
            s._onSaveAsImage = function(t) {
                s.__onSaveAsImage(t)
            },
            s._onMagicType = function(t) {
                s.__onMagicType(t)
            },
            s._onCustomHandler = function(t) {
                s.__onCustomHandler(t)
            },
            s._onmousemove = function(t) {
                return s.__onmousemove(t)
            },
            s._onmousedown = function(t) {
                return s.__onmousedown(t)
            },
            s._onmouseup = function(t) {
                return s.__onmouseup(t)
            },
            s._onclick = function(t) {
                return s.__onclick(t)
            }
        }
        var i = t("./base"),
        n = t("zrender/shape/Line"),
        r = t("zrender/shape/Image"),
        o = t("zrender/shape/Rectangle"),
        s = t("../util/shape/Icon"),
        a = t("../config");
        a.toolbox = {
            zlevel: 0,
            z: 6,
            show: !1,
            orient: "horizontal",
            x: "right",
            y: "top",
            color: ["#1e90ff", "#22bb22", "#4b0082", "#d2691e"],
            disableColor: "#ddd",
            effectiveColor: "red",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemSize: 16,
            showTitle: !0,
            feature: {
                mark: {
                    show: !1,
                    title: {
                        mark: "辅助线开关",
                        markUndo: "删除辅助线",
                        markClear: "清空辅助线"
                    },
                    lineStyle: {
                        width: 1,
                        color: "#1e90ff",
                        type: "dashed"
                    }
                },
                dataZoom: {
                    show: !1,
                    title: {
                        dataZoom: "区域缩放",
                        dataZoomReset: "区域缩放后退"
                    }
                },
                dataView: {
                    show: !1,
                    title: "数据视图",
                    readOnly: !1,
                    lang: ["数据视图", "关闭", "刷新"]
                },
                magicType: {
                    show: !1,
                    title: {
                        line: "折线图切换",
                        bar: "柱形图切换",
                        stack: "堆积",
                        tiled: "平铺",
                        force: "力导向布局图切换",
                        chord: "和弦图切换",
                        pie: "饼图切换",
                        funnel: "漏斗图切换"
                    },
                    type: []
                },
                restore: {
                    show: !1,
                    title: "还原"
                },
                saveAsImage: {
                    show: !1,
                    title: "保存为图片",
                    type: "png",
                    lang: ["点击保存"]
                }
            }
        };
        var l = t("zrender/tool/util"),
        h = t("zrender/config"),
        c = t("zrender/tool/event"),
        d = "stack",
        u = "tiled";
        return e.prototype = {
            type: a.COMPONENT_TYPE_TOOLBOX,
            _buildShape: function() {
                this._iconList = [];
                var t = this.option.toolbox;
                this._enableColor = t.effectiveColor,
                this._disableColor = t.disableColor;
                var e = t.feature,
                i = [];
                for (var n in e) if (e[n].show) switch (n) {
                case "mark":
                    i.push({
                        key:
                        n,
                        name: "mark"
                    }),
                    i.push({
                        key: n,
                        name: "markUndo"
                    }),
                    i.push({
                        key: n,
                        name: "markClear"
                    });
                    break;
                case "magicType":
                    for (var r = 0,
                    o = e[n].type.length; o > r; r++) e[n].title[e[n].type[r] + "Chart"] = e[n].title[e[n].type[r]],
                    e[n].option && (e[n].option[e[n].type[r] + "Chart"] = e[n].option[e[n].type[r]]),
                    i.push({
                        key: n,
                        name: e[n].type[r] + "Chart"
                    });
                    break;
                case "dataZoom":
                    i.push({
                        key:
                        n,
                        name: "dataZoom"
                    }),
                    i.push({
                        key: n,
                        name: "dataZoomReset"
                    });
                    break;
                case "saveAsImage":
                    this.canvasSupported && i.push({
                        key: n,
                        name: "saveAsImage"
                    });
                    break;
                default:
                    i.push({
                        key:
                        n,
                        name: n
                    })
                }
                if (i.length > 0) {
                    for (var s, n, r = 0,
                    o = i.length; o > r; r++) s = i[r].name,
                    n = i[r].key,
                    this._iconList.push(s),
                    this._featureTitle[s] = e[n].title[s] || e[n].title,
                    e[n].icon && (this._featureIcon[s] = e[n].icon[s] || e[n].icon),
                    e[n].color && (this._featureColor[s] = e[n].color[s] || e[n].color),
                    e[n].option && (this._featureOption[s] = e[n].option[s] || e[n].option);
                    this._itemGroupLocation = this._getItemGroupLocation(),
                    this._buildBackground(),
                    this._buildItem();
                    for (var r = 0,
                    o = this.shapeList.length; o > r; r++) this.zr.addShape(this.shapeList[r]);
                    this._iconShapeMap.mark && (this._iconDisable(this._iconShapeMap.markUndo), this._iconDisable(this._iconShapeMap.markClear)),
                    this._iconShapeMap.dataZoomReset && 0 === this._zoomQueue.length && this._iconDisable(this._iconShapeMap.dataZoomReset)
                }
            },
            _buildItem: function() {
                var e, i, n, o, a = this.option.toolbox,
                l = this._iconList.length,
                h = this._itemGroupLocation.x,
                c = this._itemGroupLocation.y,
                d = a.itemSize,
                u = a.itemGap,
                p = a.color instanceof Array ? a.color: [a.color],
                f = this.getFont(a.textStyle);
                "horizontal" === a.orient ? (i = this._itemGroupLocation.y / this.zr.getHeight() < .5 ? "bottom": "top", n = this._itemGroupLocation.x / this.zr.getWidth() < .5 ? "left": "right", o = this._itemGroupLocation.y / this.zr.getHeight() < .5 ? "top": "bottom") : i = this._itemGroupLocation.x / this.zr.getWidth() < .5 ? "right": "left",
                this._iconShapeMap = {};
                for (var g = this,
                m = 0; l > m; m++) {
                    switch (e = {
                        type: "icon",
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase(),
                        style: {
                            x: h,
                            y: c,
                            width: d,
                            height: d,
                            iconType: this._iconList[m],
                            lineWidth: 1,
                            strokeColor: this._featureColor[this._iconList[m]] || p[m % p.length],
                            brushType: "stroke"
                        },
                        highlightStyle: {
                            lineWidth: 1,
                            text: a.showTitle ? this._featureTitle[this._iconList[m]] : void 0,
                            textFont: f,
                            textPosition: i,
                            strokeColor: this._featureColor[this._iconList[m]] || p[m % p.length]
                        },
                        hoverable: !0,
                        clickable: !0
                    },
                    this._featureIcon[this._iconList[m]] && (e.style.image = this._featureIcon[this._iconList[m]].replace(new RegExp("^image:\\/\\/"), ""), e.style.opacity = .8, e.highlightStyle.opacity = 1, e.type = "image"), "horizontal" === a.orient && (0 === m && "left" === n && (e.highlightStyle.textPosition = "specific", e.highlightStyle.textAlign = n, e.highlightStyle.textBaseline = o, e.highlightStyle.textX = h, e.highlightStyle.textY = "top" === o ? c + d + 10 : c - 10), m === l - 1 && "right" === n && (e.highlightStyle.textPosition = "specific", e.highlightStyle.textAlign = n, e.highlightStyle.textBaseline = o, e.highlightStyle.textX = h + d, e.highlightStyle.textY = "top" === o ? c + d + 10 : c - 10)), this._iconList[m]) {
                    case "mark":
                        e.onclick = g._onMark;
                        break;
                    case "markUndo":
                        e.onclick = g._onMarkUndo;
                        break;
                    case "markClear":
                        e.onclick = g._onMarkClear;
                        break;
                    case "dataZoom":
                        e.onclick = g._onDataZoom;
                        break;
                    case "dataZoomReset":
                        e.onclick = g._onDataZoomReset;
                        break;
                    case "dataView":
                        if (!this._dataView) {
                            var _ = t("./dataView");
                            this._dataView = new _(this.ecTheme, this.messageCenter, this.zr, this.option, this.myChart)
                        }
                        e.onclick = g._onDataView;
                        break;
                    case "restore":
                        e.onclick = g._onRestore;
                        break;
                    case "saveAsImage":
                        e.onclick = g._onSaveAsImage;
                        break;
                    default:
                        this._iconList[m].match("Chart") ? (e._name = this._iconList[m].replace("Chart", ""), e.onclick = g._onMagicType) : e.onclick = g._onCustomHandler
                    }
                    "icon" === e.type ? e = new s(e) : "image" === e.type && (e = new r(e)),
                    this.shapeList.push(e),
                    this._iconShapeMap[this._iconList[m]] = e,
                    "horizontal" === a.orient ? h += d + u: c += d + u
                }
            },
            _buildBackground: function() {
                var t = this.option.toolbox,
                e = this.reformCssArray(this.option.toolbox.padding);
                this.shapeList.push(new o({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    hoverable: !1,
                    style: {
                        x: this._itemGroupLocation.x - e[3],
                        y: this._itemGroupLocation.y - e[0],
                        width: this._itemGroupLocation.width + e[3] + e[1],
                        height: this._itemGroupLocation.height + e[0] + e[2],
                        brushType: 0 === t.borderWidth ? "fill": "both",
                        color: t.backgroundColor,
                        strokeColor: t.borderColor,
                        lineWidth: t.borderWidth
                    }
                }))
            },
            _getItemGroupLocation: function() {
                var t = this.option.toolbox,
                e = this.reformCssArray(this.option.toolbox.padding),
                i = this._iconList.length,
                n = t.itemGap,
                r = t.itemSize,
                o = 0,
                s = 0;
                "horizontal" === t.orient ? (o = (r + n) * i - n, s = r) : (s = (r + n) * i - n, o = r);
                var a, l = this.zr.getWidth();
                switch (t.x) {
                case "center":
                    a = Math.floor((l - o) / 2);
                    break;
                case "left":
                    a = e[3] + t.borderWidth;
                    break;
                case "right":
                    a = l - o - e[1] - t.borderWidth;
                    break;
                default:
                    a = t.x - 0,
                    a = isNaN(a) ? 0 : a
                }
                var h, c = this.zr.getHeight();
                switch (t.y) {
                case "top":
                    h = e[0] + t.borderWidth;
                    break;
                case "bottom":
                    h = c - s - e[2] - t.borderWidth;
                    break;
                case "center":
                    h = Math.floor((c - s) / 2);
                    break;
                default:
                    h = t.y - 0,
                    h = isNaN(h) ? 0 : h
                }
                return {
                    x: a,
                    y: h,
                    width: o,
                    height: s
                }
            },
            __onmousemove: function(t) {
                this._marking && (this._markShape.style.xEnd = c.getX(t.event), this._markShape.style.yEnd = c.getY(t.event), this.zr.addHoverShape(this._markShape)),
                this._zooming && (this._zoomShape.style.width = c.getX(t.event) - this._zoomShape.style.x, this._zoomShape.style.height = c.getY(t.event) - this._zoomShape.style.y, this.zr.addHoverShape(this._zoomShape), this.dom.style.cursor = "crosshair", c.stop(t.event)),
                this._zoomStart && "pointer" != this.dom.style.cursor && "move" != this.dom.style.cursor && (this.dom.style.cursor = "crosshair")
            },
            __onmousedown: function(t) {
                if (!t.target) {
                    this._zooming = !0;
                    var e = c.getX(t.event),
                    i = c.getY(t.event),
                    n = this.option.dataZoom || {};
                    return this._zoomShape = new o({
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase(),
                        style: {
                            x: e,
                            y: i,
                            width: 1,
                            height: 1,
                            brushType: "both"
                        },
                        highlightStyle: {
                            lineWidth: 2,
                            color: n.fillerColor || a.dataZoom.fillerColor,
                            strokeColor: n.handleColor || a.dataZoom.handleColor,
                            brushType: "both"
                        }
                    }),
                    this.zr.addHoverShape(this._zoomShape),
                    !0
                }
            },
            __onmouseup: function() {
                if (!this._zoomShape || Math.abs(this._zoomShape.style.width) < 10 || Math.abs(this._zoomShape.style.height) < 10) return this._zooming = !1,
                !0;
                if (this._zooming && this.component.dataZoom) {
                    this._zooming = !1;
                    var t = this.component.dataZoom.rectZoom(this._zoomShape.style);
                    t && (this._zoomQueue.push({
                        start: t.start,
                        end: t.end,
                        start2: t.start2,
                        end2: t.end2
                    }), this._iconEnable(this._iconShapeMap.dataZoomReset), this.zr.refreshNextFrame())
                }
                return ! 0
            },
            __onclick: function(t) {
                if (!t.target) if (this._marking) this._marking = !1,
                this._markShapeList.push(this._markShape),
                this._iconEnable(this._iconShapeMap.markUndo),
                this._iconEnable(this._iconShapeMap.markClear),
                this.zr.addShape(this._markShape),
                this.zr.refreshNextFrame();
                else if (this._markStart) {
                    this._marking = !0;
                    var e = c.getX(t.event),
                    i = c.getY(t.event);
                    this._markShape = new n({
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase(),
                        style: {
                            xStart: e,
                            yStart: i,
                            xEnd: e,
                            yEnd: i,
                            lineWidth: this.query(this.option, "toolbox.feature.mark.lineStyle.width"),
                            strokeColor: this.query(this.option, "toolbox.feature.mark.lineStyle.color"),
                            lineType: this.query(this.option, "toolbox.feature.mark.lineStyle.type")
                        }
                    }),
                    this.zr.addHoverShape(this._markShape)
                }
            },
            __onMark: function(t) {
                var e = t.target;
                if (this._marking || this._markStart) this._resetMark(),
                this.zr.refreshNextFrame();
                else {
                    this._resetZoom(),
                    this.zr.modShape(e.id, {
                        style: {
                            strokeColor: this._enableColor
                        }
                    }),
                    this.zr.refreshNextFrame(),
                    this._markStart = !0;
                    var i = this;
                    setTimeout(function() {
                        i.zr && i.zr.on(h.EVENT.CLICK, i._onclick) && i.zr.on(h.EVENT.MOUSEMOVE, i._onmousemove)
                    },
                    10)
                }
                return ! 0
            },
            __onMarkUndo: function() {
                if (this._marking) this._marking = !1;
                else {
                    var t = this._markShapeList.length;
                    if (t >= 1) {
                        var e = this._markShapeList[t - 1];
                        this.zr.delShape(e.id),
                        this.zr.refreshNextFrame(),
                        this._markShapeList.pop(),
                        1 === t && (this._iconDisable(this._iconShapeMap.markUndo), this._iconDisable(this._iconShapeMap.markClear))
                    }
                }
                return ! 0
            },
            __onMarkClear: function() {
                this._marking && (this._marking = !1);
                var t = this._markShapeList.length;
                if (t > 0) {
                    for (; t--;) this.zr.delShape(this._markShapeList.pop().id);
                    this._iconDisable(this._iconShapeMap.markUndo),
                    this._iconDisable(this._iconShapeMap.markClear),
                    this.zr.refreshNextFrame()
                }
                return ! 0
            },
            __onDataZoom: function(t) {
                var e = t.target;
                if (this._zooming || this._zoomStart) this._resetZoom(),
                this.zr.refreshNextFrame(),
                this.dom.style.cursor = "default";
                else {
                    this._resetMark(),
                    this.zr.modShape(e.id, {
                        style: {
                            strokeColor: this._enableColor
                        }
                    }),
                    this.zr.refreshNextFrame(),
                    this._zoomStart = !0;
                    var i = this;
                    setTimeout(function() {
                        i.zr && i.zr.on(h.EVENT.MOUSEDOWN, i._onmousedown) && i.zr.on(h.EVENT.MOUSEUP, i._onmouseup) && i.zr.on(h.EVENT.MOUSEMOVE, i._onmousemove)
                    },
                    10),
                    this.dom.style.cursor = "crosshair"
                }
                return ! 0
            },
            __onDataZoomReset: function() {
                return this._zooming && (this._zooming = !1),
                this._zoomQueue.pop(),
                this._zoomQueue.length > 0 ? this.component.dataZoom.absoluteZoom(this._zoomQueue[this._zoomQueue.length - 1]) : (this.component.dataZoom.rectZoom(), this._iconDisable(this._iconShapeMap.dataZoomReset), this.zr.refreshNextFrame()),
                !0
            },
            _resetMark: function() {
                this._marking = !1,
                this._markStart && (this._markStart = !1, this._iconShapeMap.mark && this.zr.modShape(this._iconShapeMap.mark.id, {
                    style: {
                        strokeColor: this._iconShapeMap.mark.highlightStyle.strokeColor
                    }
                }), this.zr.un(h.EVENT.CLICK, this._onclick), this.zr.un(h.EVENT.MOUSEMOVE, this._onmousemove))
            },
            _resetZoom: function() {
                this._zooming = !1,
                this._zoomStart && (this._zoomStart = !1, this._iconShapeMap.dataZoom && this.zr.modShape(this._iconShapeMap.dataZoom.id, {
                    style: {
                        strokeColor: this._iconShapeMap.dataZoom.highlightStyle.strokeColor
                    }
                }), this.zr.un(h.EVENT.MOUSEDOWN, this._onmousedown), this.zr.un(h.EVENT.MOUSEUP, this._onmouseup), this.zr.un(h.EVENT.MOUSEMOVE, this._onmousemove))
            },
            _iconDisable: function(t) {
                "image" != t.type ? this.zr.modShape(t.id, {
                    hoverable: !1,
                    clickable: !1,
                    style: {
                        strokeColor: this._disableColor
                    }
                }) : this.zr.modShape(t.id, {
                    hoverable: !1,
                    clickable: !1,
                    style: {
                        opacity: .3
                    }
                })
            },
            _iconEnable: function(t) {
                "image" != t.type ? this.zr.modShape(t.id, {
                    hoverable: !0,
                    clickable: !0,
                    style: {
                        strokeColor: t.highlightStyle.strokeColor
                    }
                }) : this.zr.modShape(t.id, {
                    hoverable: !0,
                    clickable: !0,
                    style: {
                        opacity: .8
                    }
                })
            },
            __onDataView: function() {
                return this._dataView.show(this.option),
                !0
            },
            __onRestore: function() {
                return this._resetMark(),
                this._resetZoom(),
                this.messageCenter.dispatch(a.EVENT.RESTORE, null, null, this.myChart),
                !0
            },
            __onSaveAsImage: function() {
                var t = this.option.toolbox.feature.saveAsImage,
                e = t.type || "png";
                "png" != e && "jpeg" != e && (e = "png");
                var i;
                i = this.myChart.isConnected() ? this.myChart.getConnectedDataURL(e) : this.zr.toDataURL("image/" + e, this.option.backgroundColor && "rgba(0,0,0,0)" === this.option.backgroundColor.replace(" ", "") ? "#fff": this.option.backgroundColor);
                var n = document.createElement("div");
                n.id = "__echarts_download_wrap__",
                n.style.cssText = "position:fixed;z-index:99999;display:block;top:0;left:0;background-color:rgba(33,33,33,0.5);text-align:center;width:100%;height:100%;line-height:" + document.documentElement.clientHeight + "px;";
                var r = document.createElement("a");
                r.href = i,
                r.setAttribute("download", (t.name ? t.name: this.option.title && (this.option.title.text || this.option.title.subtext) ? this.option.title.text || this.option.title.subtext: "ECharts") + "." + e),
                r.innerHTML = '<img style="vertical-align:middle" src="' + i + '" title="' + (window.ActiveXObject || "ActiveXObject" in window ? "右键->图片另存为": t.lang ? t.lang[0] : "点击保存") + '"/>',
                n.appendChild(r),
                document.body.appendChild(n),
                r = null,
                n = null,
                setTimeout(function() {
                    var t = document.getElementById("__echarts_download_wrap__");
                    t && (t.onclick = function() {
                        var t = document.getElementById("__echarts_download_wrap__");
                        t.onclick = null,
                        t.innerHTML = "",
                        document.body.removeChild(t),
                        t = null
                    },
                    t = null)
                },
                500)
            },
            __onMagicType: function(t) {
                this._resetMark();
                var e = t.target._name;
                return this._magicType[e] || (this._magicType[e] = !0, e === a.CHART_TYPE_LINE ? this._magicType[a.CHART_TYPE_BAR] = !1 : e === a.CHART_TYPE_BAR && (this._magicType[a.CHART_TYPE_LINE] = !1), e === a.CHART_TYPE_PIE ? this._magicType[a.CHART_TYPE_FUNNEL] = !1 : e === a.CHART_TYPE_FUNNEL && (this._magicType[a.CHART_TYPE_PIE] = !1), e === a.CHART_TYPE_FORCE ? this._magicType[a.CHART_TYPE_CHORD] = !1 : e === a.CHART_TYPE_CHORD && (this._magicType[a.CHART_TYPE_FORCE] = !1), e === d ? this._magicType[u] = !1 : e === u && (this._magicType[d] = !1), this.messageCenter.dispatch(a.EVENT.MAGIC_TYPE_CHANGED, t.event, {
                    magicType: this._magicType
                },
                this.myChart)),
                !0
            },
            setMagicType: function(t) {
                this._resetMark(),
                this._magicType = t,
                !this._isSilence && this.messageCenter.dispatch(a.EVENT.MAGIC_TYPE_CHANGED, null, {
                    magicType: this._magicType
                },
                this.myChart)
            },
            __onCustomHandler: function(t) {
                var e = t.target.style.iconType,
                i = this.option.toolbox.feature[e].onclick;
                "function" == typeof i && i.call(this, this.option)
            },
            reset: function(t, e) {
                if (e && this.clear(), this.query(t, "toolbox.show") && this.query(t, "toolbox.feature.magicType.show")) {
                    var i = t.toolbox.feature.magicType.type,
                    n = i.length;
                    for (this._magicMap = {}; n--;) this._magicMap[i[n]] = !0;
                    n = t.series.length;
                    for (var r, o; n--;) r = t.series[n].type,
                    this._magicMap[r] && (o = t.xAxis instanceof Array ? t.xAxis[t.series[n].xAxisIndex || 0] : t.xAxis, o && "category" === (o.type || "category") && (o.__boundaryGap = null != o.boundaryGap ? o.boundaryGap: !0), o = t.yAxis instanceof Array ? t.yAxis[t.series[n].yAxisIndex || 0] : t.yAxis, o && "category" === o.type && (o.__boundaryGap = null != o.boundaryGap ? o.boundaryGap: !0), t.series[n].__type = r, t.series[n].__itemStyle = l.clone(t.series[n].itemStyle || {})),
                    (this._magicMap[d] || this._magicMap[u]) && (t.series[n].__stack = t.series[n].stack)
                }
                this._magicType = e ? {}: this._magicType || {};
                for (var s in this._magicType) if (this._magicType[s]) {
                    this.option = t,
                    this.getMagicOption();
                    break
                }
                var a = t.dataZoom;
                if (a && a.show) {
                    var h = null != a.start && a.start >= 0 && a.start <= 100 ? a.start: 0,
                    c = null != a.end && a.end >= 0 && a.end <= 100 ? a.end: 100;
                    h > c && (h += c, c = h - c, h -= c),
                    this._zoomQueue = [{
                        start: h,
                        end: c,
                        start2: 0,
                        end2: 100
                    }]
                } else this._zoomQueue = []
            },
            getMagicOption: function() {
                var t, e;
                if (this._magicType[a.CHART_TYPE_LINE] || this._magicType[a.CHART_TYPE_BAR]) {
                    for (var i = this._magicType[a.CHART_TYPE_LINE] ? !1 : !0, n = 0, r = this.option.series.length; r > n; n++) e = this.option.series[n].type,
                    (e == a.CHART_TYPE_LINE || e == a.CHART_TYPE_BAR) && (t = this.option.xAxis instanceof Array ? this.option.xAxis[this.option.series[n].xAxisIndex || 0] : this.option.xAxis, t && "category" === (t.type || "category") && (t.boundaryGap = i ? !0 : t.__boundaryGap), t = this.option.yAxis instanceof Array ? this.option.yAxis[this.option.series[n].yAxisIndex || 0] : this.option.yAxis, t && "category" === t.type && (t.boundaryGap = i ? !0 : t.__boundaryGap));
                    this._defaultMagic(a.CHART_TYPE_LINE, a.CHART_TYPE_BAR)
                }
                if (this._defaultMagic(a.CHART_TYPE_CHORD, a.CHART_TYPE_FORCE), this._defaultMagic(a.CHART_TYPE_PIE, a.CHART_TYPE_FUNNEL), this._magicType[d] || this._magicType[u]) for (var n = 0,
                r = this.option.series.length; r > n; n++) this._magicType[d] ? (this.option.series[n].stack = "_ECHARTS_STACK_KENER_2014_", e = d) : this._magicType[u] && (this.option.series[n].stack = null, e = u),
                this._featureOption[e + "Chart"] && l.merge(this.option.series[n], this._featureOption[e + "Chart"] || {},
                !0);
                return this.option
            },
            _defaultMagic: function(t, e) {
                if (this._magicType[t] || this._magicType[e]) for (var i = 0,
                n = this.option.series.length; n > i; i++) {
                    var r = this.option.series[i].type; (r == t || r == e) && (this.option.series[i].type = this._magicType[t] ? t: e, this.option.series[i].itemStyle = l.clone(this.option.series[i].__itemStyle), r = this.option.series[i].type, this._featureOption[r + "Chart"] && l.merge(this.option.series[i], this._featureOption[r + "Chart"] || {},
                    !0))
                }
            },
            silence: function(t) {
                this._isSilence = t
            },
            resize: function() {
                this._resetMark(),
                this.clear(),
                this.option && this.option.toolbox && this.option.toolbox.show && this._buildShape(),
                this._dataView && this._dataView.resize()
            },
            hideDataView: function() {
                this._dataView && this._dataView.hide()
            },
            clear: function(t) {
                this.zr && (this.zr.delShape(this.shapeList), this.shapeList = [], t || (this.zr.delShape(this._markShapeList), this._markShapeList = []))
            },
            onbeforDispose: function() {
                this._dataView && (this._dataView.dispose(), this._dataView = null),
                this._markShapeList = null
            },
            refresh: function(t) {
                t && (this._resetMark(), this._resetZoom(), t.toolbox = this.reformOption(t.toolbox), this.option = t, this.clear(!0), t.toolbox.show && this._buildShape(), this.hideDataView())
            }
        },
        l.inherits(e, i),
        t("../component").define("toolbox", e),
        e
    }),
    i("echarts/component", [],
    function() {
        var t = {},
        e = {};
        return t.define = function(i, n) {
            return e[i] = n,
            t
        },
        t.get = function(t) {
            return e[t]
        },
        t
    }),
    i("echarts/component/title", ["require", "./base", "zrender/shape/Text", "zrender/shape/Rectangle", "../config", "zrender/tool/util", "zrender/tool/area", "zrender/tool/color", "../component"],
    function(t) {
        function e(t, e, n, r, o) {
            i.call(this, t, e, n, r, o),
            this.refresh(r)
        }
        var i = t("./base"),
        n = t("zrender/shape/Text"),
        r = t("zrender/shape/Rectangle"),
        o = t("../config");
        o.title = {
            zlevel: 0,
            z: 6,
            show: !0,
            text: "",
            subtext: "",
            x: "left",
            y: "top",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 5,
            textStyle: {
                fontSize: 18,
                fontWeight: "bolder",
                color: "#333"
            },
            subtextStyle: {
                color: "#aaa"
            }
        };
        var s = t("zrender/tool/util"),
        a = t("zrender/tool/area"),
        l = t("zrender/tool/color");
        return e.prototype = {
            type: o.COMPONENT_TYPE_TITLE,
            _buildShape: function() {
                if (this.titleOption.show) {
                    this._itemGroupLocation = this._getItemGroupLocation(),
                    this._buildBackground(),
                    this._buildItem();
                    for (var t = 0,
                    e = this.shapeList.length; e > t; t++) this.zr.addShape(this.shapeList[t])
                }
            },
            _buildItem: function() {
                var t = this.titleOption.text,
                e = this.titleOption.link,
                i = this.titleOption.target,
                r = this.titleOption.subtext,
                o = this.titleOption.sublink,
                s = this.titleOption.subtarget,
                a = this.getFont(this.titleOption.textStyle),
                h = this.getFont(this.titleOption.subtextStyle),
                c = this._itemGroupLocation.x,
                d = this._itemGroupLocation.y,
                u = this._itemGroupLocation.width,
                p = this._itemGroupLocation.height,
                f = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                        y: d,
                        color: this.titleOption.textStyle.color,
                        text: t,
                        textFont: a,
                        textBaseline: "top"
                    },
                    highlightStyle: {
                        color: l.lift(this.titleOption.textStyle.color, 1),
                        brushType: "fill"
                    },
                    hoverable: !1
                };
                e && (f.hoverable = !0, f.clickable = !0, f.onclick = function() {
                    i && "self" == i ? window.location = e: window.open(e)
                });
                var g = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                        y: d + p,
                        color: this.titleOption.subtextStyle.color,
                        text: r,
                        textFont: h,
                        textBaseline: "bottom"
                    },
                    highlightStyle: {
                        color: l.lift(this.titleOption.subtextStyle.color, 1),
                        brushType: "fill"
                    },
                    hoverable: !1
                };
                switch (o && (g.hoverable = !0, g.clickable = !0, g.onclick = function() {
                    s && "self" == s ? window.location = o: window.open(o)
                }), this.titleOption.x) {
                case "center":
                    f.style.x = g.style.x = c + u / 2,
                    f.style.textAlign = g.style.textAlign = "center";
                    break;
                case "left":
                    f.style.x = g.style.x = c,
                    f.style.textAlign = g.style.textAlign = "left";
                    break;
                case "right":
                    f.style.x = g.style.x = c + u,
                    f.style.textAlign = g.style.textAlign = "right";
                    break;
                default:
                    c = this.titleOption.x - 0,
                    c = isNaN(c) ? 0 : c,
                    f.style.x = g.style.x = c
                }
                this.titleOption.textAlign && (f.style.textAlign = g.style.textAlign = this.titleOption.textAlign),
                this.shapeList.push(new n(f)),
                "" !== r && this.shapeList.push(new n(g))
            },
            _buildBackground: function() {
                var t = this.reformCssArray(this.titleOption.padding);
                this.shapeList.push(new r({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    hoverable: !1,
                    style: {
                        x: this._itemGroupLocation.x - t[3],
                        y: this._itemGroupLocation.y - t[0],
                        width: this._itemGroupLocation.width + t[3] + t[1],
                        height: this._itemGroupLocation.height + t[0] + t[2],
                        brushType: 0 === this.titleOption.borderWidth ? "fill": "both",
                        color: this.titleOption.backgroundColor,
                        strokeColor: this.titleOption.borderColor,
                        lineWidth: this.titleOption.borderWidth
                    }
                }))
            },
            _getItemGroupLocation: function() {
                var t, e = this.reformCssArray(this.titleOption.padding),
                i = this.titleOption.text,
                n = this.titleOption.subtext,
                r = this.getFont(this.titleOption.textStyle),
                o = this.getFont(this.titleOption.subtextStyle),
                s = Math.max(a.getTextWidth(i, r), a.getTextWidth(n, o)),
                l = a.getTextHeight(i, r) + ("" === n ? 0 : this.titleOption.itemGap + a.getTextHeight(n, o)),
                h = this.zr.getWidth();
                switch (this.titleOption.x) {
                case "center":
                    t = Math.floor((h - s) / 2);
                    break;
                case "left":
                    t = e[3] + this.titleOption.borderWidth;
                    break;
                case "right":
                    t = h - s - e[1] - this.titleOption.borderWidth;
                    break;
                default:
                    t = this.titleOption.x - 0,
                    t = isNaN(t) ? 0 : t
                }
                var c, d = this.zr.getHeight();
                switch (this.titleOption.y) {
                case "top":
                    c = e[0] + this.titleOption.borderWidth;
                    break;
                case "bottom":
                    c = d - l - e[2] - this.titleOption.borderWidth;
                    break;
                case "center":
                    c = Math.floor((d - l) / 2);
                    break;
                default:
                    c = this.titleOption.y - 0,
                    c = isNaN(c) ? 0 : c
                }
                return {
                    x: t,
                    y: c,
                    width: s,
                    height: l
                }
            },
            refresh: function(t) {
                t && (this.option = t, this.option.title = this.reformOption(this.option.title), this.titleOption = this.option.title, this.titleOption.textStyle = this.getTextStyle(this.titleOption.textStyle), this.titleOption.subtextStyle = this.getTextStyle(this.titleOption.subtextStyle)),
                this.clear(),
                this._buildShape()
            }
        },
        s.inherits(e, i),
        t("../component").define("title", e),
        e
    }),
    i("echarts/component/legend", ["require", "./base", "zrender/shape/Text", "zrender/shape/Rectangle", "zrender/shape/Sector", "../util/shape/Icon", "../util/shape/Candle", "../config", "zrender/tool/util", "zrender/tool/area", "../component"],
    function(t) {
        function e(t, e, n, r, o) {
            if (!this.query(r, "legend.data")) return void console.error("option.legend.data has not been defined.");
            i.call(this, t, e, n, r, o);
            var s = this;
            s._legendSelected = function(t) {
                s.__legendSelected(t)
            },
            s._dispatchHoverLink = function(t) {
                return s.__dispatchHoverLink(t)
            },
            this._colorIndex = 0,
            this._colorMap = {},
            this._selectedMap = {},
            this._hasDataMap = {},
            this.refresh(r)
        }
        var i = t("./base"),
        n = t("zrender/shape/Text"),
        r = t("zrender/shape/Rectangle"),
        o = t("zrender/shape/Sector"),
        s = t("../util/shape/Icon"),
        a = t("../util/shape/Candle"),
        l = t("../config");
        l.legend = {
            zlevel: 0,
            z: 4,
            show: !0,
            orient: "horizontal",
            x: "center",
            y: "top",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemWidth: 20,
            itemHeight: 14,
            textStyle: {
                color: "#333"
            },
            selectedMode: !0
        };
        var h = t("zrender/tool/util"),
        c = t("zrender/tool/area");
        e.prototype = {
            type: l.COMPONENT_TYPE_LEGEND,
            _buildShape: function() {
                if (this.legendOption.show) {
                    this._itemGroupLocation = this._getItemGroupLocation(),
                    this._buildBackground(),
                    this._buildItem();
                    for (var t = 0,
                    e = this.shapeList.length; e > t; t++) this.zr.addShape(this.shapeList[t])
                }
            },
            _buildItem: function() {
                var t, e, i, r, o, a, l, d, u = this.legendOption.data,
                p = u.length,
                f = this.legendOption.textStyle,
                g = this.zr.getWidth(),
                m = this.zr.getHeight(),
                _ = this._itemGroupLocation.x,
                y = this._itemGroupLocation.y,
                v = this.legendOption.itemWidth,
                b = this.legendOption.itemHeight,
                x = this.legendOption.itemGap;
                "vertical" === this.legendOption.orient && "right" === this.legendOption.x && (_ = this._itemGroupLocation.x + this._itemGroupLocation.width - v);
                for (var T = 0; p > T; T++) o = h.merge(u[T].textStyle || {},
                f),
                a = this.getFont(o),
                t = this._getName(u[T]),
                l = this._getFormatterName(t),
                "" !== t ? (e = u[T].icon || this._getSomethingByName(t).type, d = this.getColor(t), "horizontal" === this.legendOption.orient ? 200 > g - _ && v + 5 + c.getTextWidth(l, a) + (T === p - 1 || "" === u[T + 1] ? 0 : x) >= g - _ && (_ = this._itemGroupLocation.x, y += b + x) : 200 > m - y && b + (T === p - 1 || "" === u[T + 1] ? 0 : x) >= m - y && ("right" === this.legendOption.x ? _ -= this._itemGroupLocation.maxWidth + x: _ += this._itemGroupLocation.maxWidth + x, y = this._itemGroupLocation.y), i = this._getItemShapeByType(_, y, v, b, this._selectedMap[t] && this._hasDataMap[t] ? d: "#ccc", e, d), i._name = t, i = new s(i), r = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                        x: _ + v + 5,
                        y: y + b / 2,
                        color: this._selectedMap[t] ? "auto" === o.color ? d: o.color: "#ccc",
                        text: l,
                        textFont: a,
                        textBaseline: "middle"
                    },
                    highlightStyle: {
                        color: d,
                        brushType: "fill"
                    },
                    hoverable: !!this.legendOption.selectedMode,
                    clickable: !!this.legendOption.selectedMode
                },
                "vertical" === this.legendOption.orient && "right" === this.legendOption.x && (r.style.x -= v + 10, r.style.textAlign = "right"), r._name = t, r = new n(r), this.legendOption.selectedMode && (i.onclick = r.onclick = this._legendSelected, i.onmouseover = r.onmouseover = this._dispatchHoverLink, i.hoverConnect = r.id, r.hoverConnect = i.id), this.shapeList.push(i), this.shapeList.push(r), "horizontal" === this.legendOption.orient ? _ += v + 5 + c.getTextWidth(l, a) + x: y += b + x) : "horizontal" === this.legendOption.orient ? (_ = this._itemGroupLocation.x, y += b + x) : ("right" === this.legendOption.x ? _ -= this._itemGroupLocation.maxWidth + x: _ += this._itemGroupLocation.maxWidth + x, y = this._itemGroupLocation.y);
                "horizontal" === this.legendOption.orient && "center" === this.legendOption.x && y != this._itemGroupLocation.y && this._mLineOptimize()
            },
            _getName: function(t) {
                return "undefined" != typeof t.name ? t.name: t
            },
            _getFormatterName: function(t) {
                var e, i = this.legendOption.formatter;
                return e = "function" == typeof i ? i.call(this.myChart, t) : "string" == typeof i ? i.replace("{name}", t) : t
            },
            _getFormatterNameFromData: function(t) {
                var e = this._getName(t);
                return this._getFormatterName(e)
            },
            _mLineOptimize: function() {
                for (var t = [], e = this._itemGroupLocation.x, i = 2, n = this.shapeList.length; n > i; i++) this.shapeList[i].style.x === e ? t.push((this._itemGroupLocation.width - (this.shapeList[i - 1].style.x + c.getTextWidth(this.shapeList[i - 1].style.text, this.shapeList[i - 1].style.textFont) - e)) / 2) : i === n - 1 && t.push((this._itemGroupLocation.width - (this.shapeList[i].style.x + c.getTextWidth(this.shapeList[i].style.text, this.shapeList[i].style.textFont) - e)) / 2);
                for (var r = -1,
                i = 1,
                n = this.shapeList.length; n > i; i++) this.shapeList[i].style.x === e && r++,
                0 !== t[r] && (this.shapeList[i].style.x += t[r])
            },
            _buildBackground: function() {
                var t = this.reformCssArray(this.legendOption.padding);
                this.shapeList.push(new r({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    hoverable: !1,
                    style: {
                        x: this._itemGroupLocation.x - t[3],
                        y: this._itemGroupLocation.y - t[0],
                        width: this._itemGroupLocation.width + t[3] + t[1],
                        height: this._itemGroupLocation.height + t[0] + t[2],
                        brushType: 0 === this.legendOption.borderWidth ? "fill": "both",
                        color: this.legendOption.backgroundColor,
                        strokeColor: this.legendOption.borderColor,
                        lineWidth: this.legendOption.borderWidth
                    }
                }))
            },
            _getItemGroupLocation: function() {
                var t = this.legendOption.data,
                e = t.length,
                i = this.legendOption.itemGap,
                n = this.legendOption.itemWidth + 5,
                r = this.legendOption.itemHeight,
                o = this.legendOption.textStyle,
                s = this.getFont(o),
                a = 0,
                l = 0,
                d = this.reformCssArray(this.legendOption.padding),
                u = this.zr.getWidth() - d[1] - d[3],
                p = this.zr.getHeight() - d[0] - d[2],
                f = 0,
                g = 0;
                if ("horizontal" === this.legendOption.orient) {
                    l = r;
                    for (var m = 0; e > m; m++) if ("" !== this._getName(t[m])) {
                        var _ = c.getTextWidth(this._getFormatterNameFromData(t[m]), t[m].textStyle ? this.getFont(h.merge(t[m].textStyle || {},
                        o)) : s);
                        f + n + _ + i > u ? (f -= i, a = Math.max(a, f), l += r + i, f = 0) : (f += n + _ + i, a = Math.max(a, f - i))
                    } else f -= i,
                    a = Math.max(a, f),
                    l += r + i,
                    f = 0
                } else {
                    for (var m = 0; e > m; m++) g = Math.max(g, c.getTextWidth(this._getFormatterNameFromData(t[m]), t[m].textStyle ? this.getFont(h.merge(t[m].textStyle || {},
                    o)) : s));
                    g += n,
                    a = g;
                    for (var m = 0; e > m; m++)"" !== this._getName(t[m]) ? f + r + i > p ? (a += g + i, f -= i, l = Math.max(l, f), f = 0) : (f += r + i, l = Math.max(l, f - i)) : (a += g + i, f -= i, l = Math.max(l, f), f = 0)
                }
                u = this.zr.getWidth(),
                p = this.zr.getHeight();
                var y;
                switch (this.legendOption.x) {
                case "center":
                    y = Math.floor((u - a) / 2);
                    break;
                case "left":
                    y = d[3] + this.legendOption.borderWidth;
                    break;
                case "right":
                    y = u - a - d[1] - d[3] - 2 * this.legendOption.borderWidth;
                    break;
                default:
                    y = this.parsePercent(this.legendOption.x, u)
                }
                var v;
                switch (this.legendOption.y) {
                case "top":
                    v = d[0] + this.legendOption.borderWidth;
                    break;
                case "bottom":
                    v = p - l - d[0] - d[2] - 2 * this.legendOption.borderWidth;
                    break;
                case "center":
                    v = Math.floor((p - l) / 2);
                    break;
                default:
                    v = this.parsePercent(this.legendOption.y, p)
                }
                return {
                    x: y,
                    y: v,
                    width: a,
                    height: l,
                    maxWidth: g
                }
            },
            _getSomethingByName: function(t) {
                for (var e, i = this.option.series,
                n = 0,
                r = i.length; r > n; n++) {
                    if (i[n].name === t) return {
                        type: i[n].type,
                        series: i[n],
                        seriesIndex: n,
                        data: null,
                        dataIndex: -1
                    };
                    if (i[n].type === l.CHART_TYPE_PIE || i[n].type === l.CHART_TYPE_RADAR || i[n].type === l.CHART_TYPE_CHORD || i[n].type === l.CHART_TYPE_FORCE || i[n].type === l.CHART_TYPE_FUNNEL || i[n].type === l.CHART_TYPE_TREEMAP) {
                        e = i[n].categories || i[n].data || i[n].nodes;
                        for (var o = 0,
                        s = e.length; s > o; o++) if (e[o].name === t) return {
                            type: i[n].type,
                            series: i[n],
                            seriesIndex: n,
                            data: e[o],
                            dataIndex: o
                        }
                    }
                }
                return {
                    type: "bar",
                    series: null,
                    seriesIndex: -1,
                    data: null,
                    dataIndex: -1
                }
            },
            _getItemShapeByType: function(t, e, i, n, r, o, s) {
                var a, h = "#ccc" === r ? s: r,
                c = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                        iconType: "legendicon" + o,
                        x: t,
                        y: e,
                        width: i,
                        height: n,
                        color: r,
                        strokeColor: r,
                        lineWidth: 2
                    },
                    highlightStyle: {
                        color: h,
                        strokeColor: h,
                        lineWidth: 1
                    },
                    hoverable: this.legendOption.selectedMode,
                    clickable: this.legendOption.selectedMode
                };
                if (o.match("image")) {
                    var a = o.replace(new RegExp("^image:\\/\\/"), "");
                    o = "image"
                }
                switch (o) {
                case "line":
                    c.style.brushType = "stroke",
                    c.highlightStyle.lineWidth = 3;
                    break;
                case "radar":
                case "venn":
                case "tree":
                case "treemap":
                case "scatter":
                    c.highlightStyle.lineWidth = 3;
                    break;
                case "k":
                    c.style.brushType = "both",
                    c.highlightStyle.lineWidth = 3,
                    c.highlightStyle.color = c.style.color = this.deepQuery([this.ecTheme, l], "k.itemStyle.normal.color") || "#fff",
                    c.style.strokeColor = "#ccc" != r ? this.deepQuery([this.ecTheme, l], "k.itemStyle.normal.lineStyle.color") || "#ff3200": r;
                    break;
                case "image":
                    c.style.iconType = "image",
                    c.style.image = a,
                    "#ccc" === r && (c.style.opacity = .5)
                }
                return c
            },
            __legendSelected: function(t) {
                var e = t.target._name;
                if ("single" === this.legendOption.selectedMode) for (var i in this._selectedMap) this._selectedMap[i] = !1;
                this._selectedMap[e] = !this._selectedMap[e],
                this.messageCenter.dispatch(l.EVENT.LEGEND_SELECTED, t.event, {
                    selected: this._selectedMap,
                    target: e
                },
                this.myChart)
            },
            __dispatchHoverLink: function(t) {
                this.messageCenter.dispatch(l.EVENT.LEGEND_HOVERLINK, t.event, {
                    target: t.target._name
                },
                this.myChart)
            },
            refresh: function(t) {
                if (t) {
                    this.option = t || this.option,
                    this.option.legend = this.reformOption(this.option.legend),
                    this.legendOption = this.option.legend;
                    var e, i, n, r, o = this.legendOption.data || [];
                    if (this.legendOption.selected) for (var s in this.legendOption.selected) this._selectedMap[s] = "undefined" != typeof this._selectedMap[s] ? this._selectedMap[s] : this.legendOption.selected[s];
                    for (var a = 0,
                    h = o.length; h > a; a++) e = this._getName(o[a]),
                    "" !== e && (i = this._getSomethingByName(e), i.series ? (this._hasDataMap[e] = !0, r = !i.data || i.type !== l.CHART_TYPE_PIE && i.type !== l.CHART_TYPE_FORCE && i.type !== l.CHART_TYPE_FUNNEL ? [i.series] : [i.data, i.series], n = this.getItemStyleColor(this.deepQuery(r, "itemStyle.normal.color"), i.seriesIndex, i.dataIndex, i.data), n && i.type != l.CHART_TYPE_K && this.setColor(e, n), this._selectedMap[e] = null != this._selectedMap[e] ? this._selectedMap[e] : !0) : this._hasDataMap[e] = !1)
                }
                this.clear(),
                this._buildShape()
            },
            getRelatedAmount: function(t) {
                for (var e, i = 0,
                n = this.option.series,
                r = 0,
                o = n.length; o > r; r++) if (n[r].name === t && i++, n[r].type === l.CHART_TYPE_PIE || n[r].type === l.CHART_TYPE_RADAR || n[r].type === l.CHART_TYPE_CHORD || n[r].type === l.CHART_TYPE_FORCE || n[r].type === l.CHART_TYPE_FUNNEL) {
                    e = n[r].type != l.CHART_TYPE_FORCE ? n[r].data: n[r].categories;
                    for (var s = 0,
                    a = e.length; a > s; s++) e[s].name === t && "-" != e[s].value && i++
                }
                return i
            },
            setColor: function(t, e) {
                this._colorMap[t] = e
            },
            getColor: function(t) {
                return this._colorMap[t] || (this._colorMap[t] = this.zr.getColor(this._colorIndex++)),
                this._colorMap[t]
            },
            hasColor: function(t) {
                return this._colorMap[t] ? this._colorMap[t] : !1
            },
            add: function(t, e) {
                for (var i = this.legendOption.data,
                n = 0,
                r = i.length; r > n; n++) if (this._getName(i[n]) === t) return;
                this.legendOption.data.push(t),
                this.setColor(t, e),
                this._selectedMap[t] = !0,
                this._hasDataMap[t] = !0
            },
            del: function(t) {
                for (var e = this.legendOption.data,
                i = 0,
                n = e.length; n > i; i++) if (this._getName(e[i]) === t) return this.legendOption.data.splice(i, 1)
            },
            getItemShape: function(t) {
                if (null != t) for (var e, i = 0,
                n = this.shapeList.length; n > i; i++) if (e = this.shapeList[i], e._name === t && "text" != e.type) return e
            },
            setItemShape: function(t, e) {
                for (var i, n = 0,
                r = this.shapeList.length; r > n; n++) i = this.shapeList[n],
                i._name === t && "text" != i.type && (this._selectedMap[t] || (e.style.color = "#ccc", e.style.strokeColor = "#ccc"), this.zr.modShape(i.id, e))
            },
            isSelected: function(t) {
                return "undefined" != typeof this._selectedMap[t] ? this._selectedMap[t] : !0
            },
            getSelectedMap: function() {
                return this._selectedMap
            },
            setSelected: function(t, e) {
                if ("single" === this.legendOption.selectedMode) for (var i in this._selectedMap) this._selectedMap[i] = !1;
                this._selectedMap[t] = e,
                this.messageCenter.dispatch(l.EVENT.LEGEND_SELECTED, null, {
                    selected: this._selectedMap,
                    target: t
                },
                this.myChart)
            },
            onlegendSelected: function(t, e) {
                var i = t.selected;
                for (var n in i) this._selectedMap[n] != i[n] && (e.needRefresh = !0),
                this._selectedMap[n] = i[n]
            }
        };
        var d = {
            line: function(t, e) {
                var i = e.height / 2;
                t.moveTo(e.x, e.y + i),
                t.lineTo(e.x + e.width, e.y + i)
            },
            pie: function(t, e) {
                var i = e.x,
                n = e.y,
                r = e.width,
                s = e.height;
                o.prototype.buildPath(t, {
                    x: i + r / 2,
                    y: n + s + 2,
                    r: s,
                    r0: 6,
                    startAngle: 45,
                    endAngle: 135
                })
            },
            eventRiver: function(t, e) {
                var i = e.x,
                n = e.y,
                r = e.width,
                o = e.height;
                t.moveTo(i, n + o),
                t.bezierCurveTo(i + r, n + o, i, n + 4, i + r, n + 4),
                t.lineTo(i + r, n),
                t.bezierCurveTo(i, n, i + r, n + o - 4, i, n + o - 4),
                t.lineTo(i, n + o)
            },
            k: function(t, e) {
                var i = e.x,
                n = e.y,
                r = e.width,
                o = e.height;
                a.prototype.buildPath(t, {
                    x: i + r / 2,
                    y: [n + 1, n + 1, n + o - 6, n + o],
                    width: r - 6
                })
            },
            bar: function(t, e) {
                var i = e.x,
                n = e.y + 1,
                r = e.width,
                o = e.height - 2,
                s = 3;
                t.moveTo(i + s, n),
                t.lineTo(i + r - s, n),
                t.quadraticCurveTo(i + r, n, i + r, n + s),
                t.lineTo(i + r, n + o - s),
                t.quadraticCurveTo(i + r, n + o, i + r - s, n + o),
                t.lineTo(i + s, n + o),
                t.quadraticCurveTo(i, n + o, i, n + o - s),
                t.lineTo(i, n + s),
                t.quadraticCurveTo(i, n, i + s, n)
            },
            force: function(t, e) {
                s.prototype.iconLibrary.circle(t, e)
            },
            radar: function(t, e) {
                var i = 6,
                n = e.x + e.width / 2,
                r = e.y + e.height / 2,
                o = e.height / 2,
                s = 2 * Math.PI / i,
                a = -Math.PI / 2,
                l = n + o * Math.cos(a),
                h = r + o * Math.sin(a);
                t.moveTo(l, h),
                a += s;
                for (var c = 0,
                d = i - 1; d > c; c++) t.lineTo(n + o * Math.cos(a), r + o * Math.sin(a)),
                a += s;
                t.lineTo(l, h)
            }
        };
        d.chord = d.pie,
        d.map = d.bar;
        for (var u in d) s.prototype.iconLibrary["legendicon" + u] = d[u];
        return h.inherits(e, i),
        t("../component").define("legend", e),
        e
    }),
    i("echarts/component/timeline", ["require", "./base", "zrender/shape/Rectangle", "../util/shape/Icon", "../util/shape/Chain", "../config", "zrender/tool/util", "zrender/tool/area", "zrender/tool/event", "../component"],
    function(t) {
        function e(t, e, i, r, o) {
            n.call(this, t, e, i, r, o);
            var s = this;
            if (s._onclick = function(t) {
                return s.__onclick(t)
            },
            s._ondrift = function(t, e) {
                return s.__ondrift(this, t, e)
            },
            s._ondragend = function() {
                return s.__ondragend()
            },
            s._setCurrentOption = function() {
                var t = s.timelineOption;
                s.currentIndex %= t.data.length;
                var e = s.options[s.currentIndex] || {};
                s.myChart.setOption(e, t.notMerge),
                s.messageCenter.dispatch(a.EVENT.TIMELINE_CHANGED, null, {
                    currentIndex: s.currentIndex,
                    data: null != t.data[s.currentIndex].name ? t.data[s.currentIndex].name: t.data[s.currentIndex]
                },
                s.myChart)
            },
            s._onFrame = function() {
                s._setCurrentOption(),
                s._syncHandleShape(),
                s.timelineOption.autoPlay && (s.playTicket = setTimeout(function() {
                    return s.currentIndex += 1,
                    !s.timelineOption.loop && s.currentIndex >= s.timelineOption.data.length ? (s.currentIndex = s.timelineOption.data.length - 1, void s.stop()) : void s._onFrame()
                },
                s.timelineOption.playInterval))
            },
            this.setTheme(!1), this.options = this.option.options, this.currentIndex = this.timelineOption.currentIndex % this.timelineOption.data.length, this.timelineOption.notMerge || 0 === this.currentIndex || (this.options[this.currentIndex] = l.merge(this.options[this.currentIndex], this.options[0])), this.timelineOption.show && (this._buildShape(), this._syncHandleShape()), this._setCurrentOption(), this.timelineOption.autoPlay) {
                var s = this;
                this.playTicket = setTimeout(function() {
                    s.play()
                },
                null != this.ecTheme.animationDuration ? this.ecTheme.animationDuration: a.animationDuration)
            }
        }
        function i(t, e) {
            var i = 2,
            n = e.x + i,
            r = e.y + i + 2,
            s = e.width - i,
            a = e.height - i,
            l = e.symbol;
            if ("last" === l) t.moveTo(n + s - 2, r + a / 3),
            t.lineTo(n + s - 2, r),
            t.lineTo(n + 2, r + a / 2),
            t.lineTo(n + s - 2, r + a),
            t.lineTo(n + s - 2, r + a / 3 * 2),
            t.moveTo(n, r),
            t.lineTo(n, r);
            else if ("next" === l) t.moveTo(n + 2, r + a / 3),
            t.lineTo(n + 2, r),
            t.lineTo(n + s - 2, r + a / 2),
            t.lineTo(n + 2, r + a),
            t.lineTo(n + 2, r + a / 3 * 2),
            t.moveTo(n, r),
            t.lineTo(n, r);
            else if ("play" === l) if ("stop" === e.status) t.moveTo(n + 2, r),
            t.lineTo(n + s - 2, r + a / 2),
            t.lineTo(n + 2, r + a),
            t.lineTo(n + 2, r);
            else {
                var h = "both" === e.brushType ? 2 : 3;
                t.rect(n + 2, r, h, a),
                t.rect(n + s - h - 2, r, h, a)
            } else if (l.match("image")) {
                var c = "";
                c = l.replace(new RegExp("^image:\\/\\/"), ""),
                (l = o.prototype.iconLibrary.image)(t, {
                    x: n,
                    y: r,
                    width: s,
                    height: a,
                    image: c
                })
            }
        }
        var n = t("./base"),
        r = t("zrender/shape/Rectangle"),
        o = t("../util/shape/Icon"),
        s = t("../util/shape/Chain"),
        a = t("../config");
        a.timeline = {
            zlevel: 0,
            z: 4,
            show: !0,
            type: "time",
            notMerge: !1,
            realtime: !0,
            x: 80,
            x2: 80,
            y2: 0,
            height: 50,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            controlPosition: "left",
            autoPlay: !1,
            loop: !0,
            playInterval: 2e3,
            lineStyle: {
                width: 1,
                color: "#666",
                type: "dashed"
            },
            label: {
                show: !0,
                interval: "auto",
                rotate: 0,
                textStyle: {
                    color: "#333"
                }
            },
            checkpointStyle: {
                symbol: "auto",
                symbolSize: "auto",
                color: "auto",
                borderColor: "auto",
                borderWidth: "auto",
                label: {
                    show: !1,
                    textStyle: {
                        color: "auto"
                    }
                }
            },
            controlStyle: {
                itemSize: 15,
                itemGap: 5,
                normal: {
                    color: "#333"
                },
                emphasis: {
                    color: "#1e90ff"
                }
            },
            symbol: "emptyDiamond",
            symbolSize: 4,
            currentIndex: 0
        };
        var l = t("zrender/tool/util"),
        h = t("zrender/tool/area"),
        c = t("zrender/tool/event");
        return e.prototype = {
            type: a.COMPONENT_TYPE_TIMELINE,
            _buildShape: function() {
                if (this._location = this._getLocation(), this._buildBackground(), this._buildControl(), this._chainPoint = this._getChainPoint(), this.timelineOption.label.show) for (var t = this._getInterval(), e = 0, i = this._chainPoint.length; i > e; e += t) this._chainPoint[e].showLabel = !0;
                this._buildChain(),
                this._buildHandle();
                for (var e = 0,
                n = this.shapeList.length; n > e; e++) this.zr.addShape(this.shapeList[e])
            },
            _getLocation: function() {
                var t, e = this.timelineOption,
                i = this.reformCssArray(this.timelineOption.padding),
                n = this.zr.getWidth(),
                r = this.parsePercent(e.x, n),
                o = this.parsePercent(e.x2, n);
                null == e.width ? (t = n - r - o, o = n - o) : (t = this.parsePercent(e.width, n), o = r + t);
                var s, a, l = this.zr.getHeight(),
                h = this.parsePercent(e.height, l);
                return null != e.y ? (s = this.parsePercent(e.y, l), a = s + h) : (a = l - this.parsePercent(e.y2, l), s = a - h),
                {
                    x: r + i[3],
                    y: s + i[0],
                    x2: o - i[1],
                    y2: a - i[2],
                    width: t - i[1] - i[3],
                    height: h - i[0] - i[2]
                }
            },
            _getReformedLabel: function(t) {
                var e = this.timelineOption,
                i = null != e.data[t].name ? e.data[t].name: e.data[t],
                n = e.data[t].formatter || e.label.formatter;
                return n && ("function" == typeof n ? i = n.call(this.myChart, i) : "string" == typeof n && (i = n.replace("{value}", i))),
                i
            },
            _getInterval: function() {
                var t = this._chainPoint,
                e = this.timelineOption,
                i = e.label.interval;
                if ("auto" === i) {
                    var n = e.label.textStyle.fontSize,
                    r = e.data,
                    o = e.data.length;
                    if (o > 3) {
                        var s, a, l = !1;
                        for (i = 0; ! l && o > i;) {
                            i++,
                            l = !0;
                            for (var c = i; o > c; c += i) {
                                if (s = t[c].x - t[c - i].x, 0 !== e.label.rotate) a = n;
                                else if (r[c].textStyle) a = h.getTextWidth(t[c].name, t[c].textFont);
                                else {
                                    var d = t[c].name + "",
                                    u = (d.match(/\w/g) || "").length,
                                    p = d.length - u;
                                    a = u * n * 2 / 3 + p * n
                                }
                                if (a > s) {
                                    l = !1;
                                    break
                                }
                            }
                        }
                    } else i = 1
                } else i = i - 0 + 1;
                return i
            },
            _getChainPoint: function() {
                function t(t) {
                    return null != h[t].name ? h[t].name: h[t] + ""
                }
                var e, i = this.timelineOption,
                n = i.symbol.toLowerCase(),
                r = i.symbolSize,
                o = i.label.rotate,
                s = i.label.textStyle,
                a = this.getFont(s),
                h = i.data,
                c = this._location.x,
                d = this._location.y + this._location.height / 4 * 3,
                u = this._location.x2 - this._location.x,
                p = h.length,
                f = [];
                if (p > 1) {
                    var g = u / p;
                    if (g = g > 50 ? 50 : 20 > g ? 5 : g, u -= 2 * g, "number" === i.type) for (var m = 0; p > m; m++) f.push(c + g + u / (p - 1) * m);
                    else {
                        f[0] = new Date(t(0).replace(/-/g, "/")),
                        f[p - 1] = new Date(t(p - 1).replace(/-/g, "/")) - f[0];
                        for (var m = 1; p > m; m++) f[m] = c + g + u * (new Date(t(m).replace(/-/g, "/")) - f[0]) / f[p - 1];
                        f[0] = c + g
                    }
                } else f.push(c + u / 2);
                for (var _, y, v, b, x, T = [], m = 0; p > m; m++) c = f[m],
                _ = h[m].symbol && h[m].symbol.toLowerCase() || n,
                _.match("empty") ? (_ = _.replace("empty", ""), v = !0) : v = !1,
                _.match("star") && (y = _.replace("star", "") - 0 || 5, _ = "star"),
                e = h[m].textStyle ? l.merge(h[m].textStyle || {},
                s) : s,
                b = e.align || "center",
                o ? (b = o > 0 ? "right": "left", x = [o * Math.PI / 180, c, d - 5]) : x = !1,
                T.push({
                    x: c,
                    n: y,
                    isEmpty: v,
                    symbol: _,
                    symbolSize: h[m].symbolSize || r,
                    color: h[m].color,
                    borderColor: h[m].borderColor,
                    borderWidth: h[m].borderWidth,
                    name: this._getReformedLabel(m),
                    textColor: e.color,
                    textAlign: b,
                    textBaseline: e.baseline || "middle",
                    textX: c,
                    textY: d - (o ? 5 : 0),
                    textFont: h[m].textStyle ? this.getFont(e) : a,
                    rotation: x,
                    showLabel: !1
                });
                return T
            },
            _buildBackground: function() {
                var t = this.timelineOption,
                e = this.reformCssArray(this.timelineOption.padding),
                i = this._location.width,
                n = this._location.height; (0 !== t.borderWidth || "rgba(0,0,0,0)" != t.backgroundColor.replace(/\s/g, "")) && this.shapeList.push(new r({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    hoverable: !1,
                    style: {
                        x: this._location.x - e[3],
                        y: this._location.y - e[0],
                        width: i + e[1] + e[3],
                        height: n + e[0] + e[2],
                        brushType: 0 === t.borderWidth ? "fill": "both",
                        color: t.backgroundColor,
                        strokeColor: t.borderColor,
                        lineWidth: t.borderWidth
                    }
                }))
            },
            _buildControl: function() {
                var t = this,
                e = this.timelineOption,
                i = e.lineStyle,
                n = e.controlStyle;
                if ("none" !== e.controlPosition) {
                    var r, s = n.itemSize,
                    a = n.itemGap;
                    "left" === e.controlPosition ? (r = this._location.x, this._location.x += 3 * (s + a)) : (r = this._location.x2 - (3 * (s + a) - a), this._location.x2 -= 3 * (s + a));
                    var h = this._location.y,
                    c = {
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase() + 1,
                        style: {
                            iconType: "timelineControl",
                            symbol: "last",
                            x: r,
                            y: h,
                            width: s,
                            height: s,
                            brushType: "stroke",
                            color: n.normal.color,
                            strokeColor: n.normal.color,
                            lineWidth: i.width
                        },
                        highlightStyle: {
                            color: n.emphasis.color,
                            strokeColor: n.emphasis.color,
                            lineWidth: i.width + 1
                        },
                        clickable: !0
                    };
                    this._ctrLastShape = new o(c),
                    this._ctrLastShape.onclick = function() {
                        t.last()
                    },
                    this.shapeList.push(this._ctrLastShape),
                    r += s + a,
                    this._ctrPlayShape = new o(l.clone(c)),
                    this._ctrPlayShape.style.brushType = "fill",
                    this._ctrPlayShape.style.symbol = "play",
                    this._ctrPlayShape.style.status = this.timelineOption.autoPlay ? "playing": "stop",
                    this._ctrPlayShape.style.x = r,
                    this._ctrPlayShape.onclick = function() {
                        "stop" === t._ctrPlayShape.style.status ? t.play() : t.stop()
                    },
                    this.shapeList.push(this._ctrPlayShape),
                    r += s + a,
                    this._ctrNextShape = new o(l.clone(c)),
                    this._ctrNextShape.style.symbol = "next",
                    this._ctrNextShape.style.x = r,
                    this._ctrNextShape.onclick = function() {
                        t.next()
                    },
                    this.shapeList.push(this._ctrNextShape)
                }
            },
            _buildChain: function() {
                var t = this.timelineOption,
                e = t.lineStyle;
                this._timelineShae = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                        x: this._location.x,
                        y: this.subPixelOptimize(this._location.y, e.width),
                        width: this._location.x2 - this._location.x,
                        height: this._location.height,
                        chainPoint: this._chainPoint,
                        brushType: "both",
                        strokeColor: e.color,
                        lineWidth: e.width,
                        lineType: e.type
                    },
                    hoverable: !1,
                    clickable: !0,
                    onclick: this._onclick
                },
                this._timelineShae = new s(this._timelineShae),
                this.shapeList.push(this._timelineShae)
            },
            _buildHandle: function() {
                var t = this._chainPoint[this.currentIndex],
                e = t.symbolSize + 1;
                e = 5 > e ? 5 : e,
                this._handleShape = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase() + 1,
                    hoverable: !1,
                    draggable: !0,
                    style: {
                        iconType: "diamond",
                        n: t.n,
                        x: t.x - e,
                        y: this._location.y + this._location.height / 4 - e,
                        width: 2 * e,
                        height: 2 * e,
                        brushType: "both",
                        textPosition: "specific",
                        textX: t.x,
                        textY: this._location.y - this._location.height / 4,
                        textAlign: "center",
                        textBaseline: "middle"
                    },
                    highlightStyle: {},
                    ondrift: this._ondrift,
                    ondragend: this._ondragend
                },
                this._handleShape = new o(this._handleShape),
                this.shapeList.push(this._handleShape)
            },
            _syncHandleShape: function() {
                if (this.timelineOption.show) {
                    var t = this.timelineOption,
                    e = t.checkpointStyle,
                    i = this._chainPoint[this.currentIndex];
                    this._handleShape.style.text = e.label.show ? i.name: "",
                    this._handleShape.style.textFont = i.textFont,
                    this._handleShape.style.n = i.n,
                    "auto" === e.symbol ? this._handleShape.style.iconType = "none" != i.symbol ? i.symbol: "diamond": (this._handleShape.style.iconType = e.symbol, e.symbol.match("star") && (this._handleShape.style.n = e.symbol.replace("star", "") - 0 || 5, this._handleShape.style.iconType = "star"));
                    var n;
                    "auto" === e.symbolSize ? (n = i.symbolSize + 2, n = 5 > n ? 5 : n) : n = e.symbolSize - 0,
                    this._handleShape.style.color = "auto" === e.color ? i.color ? i.color: t.controlStyle.emphasis.color: e.color,
                    this._handleShape.style.textColor = "auto" === e.label.textStyle.color ? this._handleShape.style.color: e.label.textStyle.color,
                    this._handleShape.highlightStyle.strokeColor = this._handleShape.style.strokeColor = "auto" === e.borderColor ? i.borderColor ? i.borderColor: "#fff": e.borderColor,
                    this._handleShape.style.lineWidth = "auto" === e.borderWidth ? i.borderWidth ? i.borderWidth: 0 : e.borderWidth - 0,
                    this._handleShape.highlightStyle.lineWidth = this._handleShape.style.lineWidth + 1,
                    this.zr.animate(this._handleShape.id, "style").when(500, {
                        x: i.x - n,
                        textX: i.x,
                        y: this._location.y + this._location.height / 4 - n,
                        width: 2 * n,
                        height: 2 * n
                    }).start("ExponentialOut")
                }
            },
            _findChainIndex: function(t) {
                var e = this._chainPoint,
                i = e.length;
                if (t <= e[0].x) return 0;
                if (t >= e[i - 1].x) return i - 1;
                for (var n = 0; i - 1 > n; n++) if (t >= e[n].x && t <= e[n + 1].x) return Math.abs(t - e[n].x) < Math.abs(t - e[n + 1].x) ? n: n + 1
            },
            __onclick: function(t) {
                var e = c.getX(t.event),
                i = this._findChainIndex(e);
                return i === this.currentIndex ? !0 : (this.currentIndex = i, this.timelineOption.autoPlay && this.stop(), clearTimeout(this.playTicket), void this._onFrame())
            },
            __ondrift: function(t, e) {
                this.timelineOption.autoPlay && this.stop();
                var i, n = this._chainPoint,
                r = n.length;
                t.style.x + e <= n[0].x - n[0].symbolSize ? (t.style.x = n[0].x - n[0].symbolSize, i = 0) : t.style.x + e >= n[r - 1].x - n[r - 1].symbolSize ? (t.style.x = n[r - 1].x - n[r - 1].symbolSize, i = r - 1) : (t.style.x += e, i = this._findChainIndex(t.style.x));
                var o = n[i],
                s = o.symbolSize + 2;
                if (t.style.iconType = o.symbol, t.style.n = o.n, t.style.textX = t.style.x + s / 2, t.style.y = this._location.y + this._location.height / 4 - s, t.style.width = 2 * s, t.style.height = 2 * s, t.style.text = o.name, i === this.currentIndex) return ! 0;
                if (this.currentIndex = i, this.timelineOption.realtime) {
                    clearTimeout(this.playTicket);
                    var a = this;
                    this.playTicket = setTimeout(function() {
                        a._setCurrentOption()
                    },
                    200)
                }
                return ! 0
            },
            __ondragend: function() {
                this.isDragend = !0
            },
            ondragend: function(t, e) {
                this.isDragend && t.target && (!this.timelineOption.realtime && this._setCurrentOption(), e.dragOut = !0, e.dragIn = !0, e.needRefresh = !1, this.isDragend = !1, this._syncHandleShape())
            },
            last: function() {
                return this.timelineOption.autoPlay && this.stop(),
                this.currentIndex -= 1,
                this.currentIndex < 0 && (this.currentIndex = this.timelineOption.data.length - 1),
                this._onFrame(),
                this.currentIndex
            },
            next: function() {
                return this.timelineOption.autoPlay && this.stop(),
                this.currentIndex += 1,
                this.currentIndex >= this.timelineOption.data.length && (this.currentIndex = 0),
                this._onFrame(),
                this.currentIndex
            },
            play: function(t, e) {
                return this._ctrPlayShape && "playing" != this._ctrPlayShape.style.status && (this._ctrPlayShape.style.status = "playing", this.zr.modShape(this._ctrPlayShape.id), this.zr.refreshNextFrame()),
                this.timelineOption.autoPlay = null != e ? e: !0,
                this.timelineOption.autoPlay || clearTimeout(this.playTicket),
                this.currentIndex = null != t ? t: this.currentIndex + 1,
                this.currentIndex >= this.timelineOption.data.length && (this.currentIndex = 0),
                this._onFrame(),
                this.currentIndex
            },
            stop: function() {
                return this._ctrPlayShape && "stop" != this._ctrPlayShape.style.status && (this._ctrPlayShape.style.status = "stop", this.zr.modShape(this._ctrPlayShape.id), this.zr.refreshNextFrame()),
                this.timelineOption.autoPlay = !1,
                clearTimeout(this.playTicket),
                this.currentIndex
            },
            resize: function() {
                this.timelineOption.show && (this.clear(), this._buildShape(), this._syncHandleShape())
            },
            setTheme: function(t) {
                this.timelineOption = this.reformOption(l.clone(this.option.timeline)),
                this.timelineOption.label.textStyle = this.getTextStyle(this.timelineOption.label.textStyle),
                this.timelineOption.checkpointStyle.label.textStyle = this.getTextStyle(this.timelineOption.checkpointStyle.label.textStyle),
                this.myChart.canvasSupported || (this.timelineOption.realtime = !1),
                this.timelineOption.show && t && (this.clear(), this._buildShape(), this._syncHandleShape())
            },
            onbeforDispose: function() {
                clearTimeout(this.playTicket)
            }
        },
        o.prototype.iconLibrary.timelineControl = i,
        l.inherits(e, n),
        t("../component").define("timeline", e),
        e
    }),
    i("zrender/shape/Image", ["require", "./Base", "../tool/util"],
    function(t) {
        var e = t("./Base"),
        i = function(t) {
            e.call(this, t)
        };
        return i.prototype = {
            type: "image",
            brush: function(t, e, i) {
                var n = this.style || {};
                e && (n = this.getHighlightStyle(n, this.highlightStyle || {}));
                var r = n.image,
                o = this;
                if (this._imageCache || (this._imageCache = {}), "string" == typeof r) {
                    var s = r;
                    this._imageCache[s] ? r = this._imageCache[s] : (r = new Image, r.onload = function() {
                        r.onload = null,
                        o.modSelf(),
                        i()
                    },
                    r.src = s, this._imageCache[s] = r)
                }
                if (r) {
                    if ("IMG" == r.nodeName.toUpperCase()) if (window.ActiveXObject) {
                        if ("complete" != r.readyState) return
                    } else if (!r.complete) return;
                    var a = n.width || r.width,
                    l = n.height || r.height,
                    h = n.x,
                    c = n.y;
                    if (!r.width || !r.height) return;
                    if (t.save(), this.doClip(t), this.setContext(t, n), this.setTransform(t), n.sWidth && n.sHeight) {
                        var d = n.sx || 0,
                        u = n.sy || 0;
                        t.drawImage(r, d, u, n.sWidth, n.sHeight, h, c, a, l)
                    } else if (n.sx && n.sy) {
                        var d = n.sx,
                        u = n.sy,
                        p = a - d,
                        f = l - u;
                        t.drawImage(r, d, u, p, f, h, c, a, l)
                    } else t.drawImage(r, h, c, a, l);
                    n.width || (n.width = a),
                    n.height || (n.height = l),
                    this.style.width || (this.style.width = a),
                    this.style.height || (this.style.height = l),
                    this.drawText(t, n, this.style),
                    t.restore()
                }
            },
            getRect: function(t) {
                return {
                    x: t.x,
                    y: t.y,
                    width: t.width,
                    height: t.height
                }
            },
            clearCache: function() {
                this._imageCache = {}
            }
        },
        t("../tool/util").inherits(i, e),
        i
    }),
    i("zrender/loadingEffect/Bar", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Rectangle"],
    function(t) {
        function e(t) {
            i.call(this, t)
        }
        var i = t("./Base"),
        n = t("../tool/util"),
        r = t("../tool/color"),
        o = t("../shape/Rectangle");
        return n.inherits(e, i),
        e.prototype._start = function(t, e) {
            var i = n.merge(this.options, {
                textStyle: {
                    color: "#888"
                },
                backgroundColor: "rgba(250, 250, 250, 0.8)",
                effectOption: {
                    x: 0,
                    y: this.canvasHeight / 2 - 30,
                    width: this.canvasWidth,
                    height: 5,
                    brushType: "fill",
                    timeInterval: 100
                }
            }),
            s = this.createTextShape(i.textStyle),
            a = this.createBackgroundShape(i.backgroundColor),
            l = i.effectOption,
            h = new o({
                highlightStyle: n.clone(l)
            });
            return h.highlightStyle.color = l.color || r.getLinearGradient(l.x, l.y, l.x + l.width, l.y + l.height, [[0, "#ff6400"], [.5, "#ffe100"], [1, "#b1ff00"]]),
            null != i.progress ? (t(a), h.highlightStyle.width = this.adjust(i.progress, [0, 1]) * i.effectOption.width, t(h), t(s), void e()) : (h.highlightStyle.width = 0, setInterval(function() {
                t(a),
                h.highlightStyle.width < l.width ? h.highlightStyle.width += 8 : h.highlightStyle.width = 0,
                t(h),
                t(s),
                e()
            },
            l.timeInterval))
        },
        e
    }),
    i("zrender/loadingEffect/Bubble", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Circle"],
    function(t) {
        function e(t) {
            i.call(this, t)
        }
        var i = t("./Base"),
        n = t("../tool/util"),
        r = t("../tool/color"),
        o = t("../shape/Circle");
        return n.inherits(e, i),
        e.prototype._start = function(t, e) {
            for (var i = n.merge(this.options, {
                textStyle: {
                    color: "#888"
                },
                backgroundColor: "rgba(250, 250, 250, 0.8)",
                effect: {
                    n: 50,
                    lineWidth: 2,
                    brushType: "stroke",
                    color: "random",
                    timeInterval: 100
                }
            }), s = this.createTextShape(i.textStyle), a = this.createBackgroundShape(i.backgroundColor), l = i.effect, h = l.n, c = l.brushType, d = l.lineWidth, u = [], p = this.canvasWidth, f = this.canvasHeight, g = 0; h > g; g++) {
                var m = "random" == l.color ? r.alpha(r.random(), .3) : l.color;
                u[g] = new o({
                    highlightStyle: {
                        x: Math.ceil(Math.random() * p),
                        y: Math.ceil(Math.random() * f),
                        r: Math.ceil(40 * Math.random()),
                        brushType: c,
                        color: m,
                        strokeColor: m,
                        lineWidth: d
                    },
                    animationY: Math.ceil(20 * Math.random())
                })
            }
            return setInterval(function() {
                t(a);
                for (var i = 0; h > i; i++) {
                    var n = u[i].highlightStyle;
                    n.y - u[i].animationY + n.r <= 0 && (u[i].highlightStyle.y = f + n.r, u[i].highlightStyle.x = Math.ceil(Math.random() * p)),
                    u[i].highlightStyle.y -= u[i].animationY,
                    t(u[i])
                }
                t(s),
                e()
            },
            l.timeInterval)
        },
        e
    }),
    i("zrender/loadingEffect/Spin", ["require", "./Base", "../tool/util", "../tool/color", "../tool/area", "../shape/Sector"],
    function(t) {
        function e(t) {
            i.call(this, t)
        }
        var i = t("./Base"),
        n = t("../tool/util"),
        r = t("../tool/color"),
        o = t("../tool/area"),
        s = t("../shape/Sector");
        return n.inherits(e, i),
        e.prototype._start = function(t, e) {
            var i = n.merge(this.options, {
                textStyle: {
                    color: "#fff",
                    textAlign: "start"
                },
                backgroundColor: "rgba(0, 0, 0, 0.8)"
            }),
            a = this.createTextShape(i.textStyle),
            l = 10,
            h = o.getTextWidth(a.highlightStyle.text, a.highlightStyle.textFont),
            c = o.getTextHeight(a.highlightStyle.text, a.highlightStyle.textFont),
            d = n.merge(this.options.effect || {},
            {
                r0: 9,
                r: 15,
                n: 18,
                color: "#fff",
                timeInterval: 100
            }),
            u = this.getLocation(this.options.textStyle, h + l + 2 * d.r, Math.max(2 * d.r, c));
            d.x = u.x + d.r,
            d.y = a.highlightStyle.y = u.y + u.height / 2,
            a.highlightStyle.x = d.x + d.r + l;
            for (var p = this.createBackgroundShape(i.backgroundColor), f = d.n, g = d.x, m = d.y, _ = d.r0, y = d.r, v = d.color, b = [], x = Math.round(180 / f), T = 0; f > T; T++) b[T] = new s({
                highlightStyle: {
                    x: g,
                    y: m,
                    r0: _,
                    r: y,
                    startAngle: x * T * 2,
                    endAngle: x * T * 2 + x,
                    color: r.alpha(v, (T + 1) / f),
                    brushType: "fill"
                }
            });
            var w = [0, g, m];
            return setInterval(function() {
                t(p),
                w[0] -= .3;
                for (var i = 0; f > i; i++) b[i].rotation = w,
                t(b[i]);
                t(a),
                e()
            },
            d.timeInterval)
        },
        e
    }),
    i("echarts/component/tooltip", ["require", "./base", "../util/shape/Cross", "zrender/shape/Line", "zrender/shape/Rectangle", "../config", "../util/ecData", "zrender/config", "zrender/tool/event", "zrender/tool/area", "zrender/tool/color", "zrender/tool/util", "zrender/shape/Base", "../component"],
    function(t) {
        function e(t, e, o, s, a) {
            i.call(this, t, e, o, s, a),
            this.dom = a.dom;
            var l = this;
            l._onmousemove = function(t) {
                return l.__onmousemove(t)
            },
            l._onglobalout = function(t) {
                return l.__onglobalout(t)
            },
            this.zr.on(h.EVENT.MOUSEMOVE, l._onmousemove),
            this.zr.on(h.EVENT.GLOBALOUT, l._onglobalout),
            l._hide = function(t) {
                return l.__hide(t)
            },
            l._tryShow = function(t) {
                return l.__tryShow(t)
            },
            l._refixed = function(t) {
                return l.__refixed(t)
            },
            l._setContent = function(t, e) {
                return l.__setContent(t, e)
            },
            this._tDom = this._tDom || document.createElement("div"),
            this._tDom.onselectstart = function() {
                return ! 1
            },
            this._tDom.onmouseover = function() {
                l._mousein = !0
            },
            this._tDom.onmouseout = function() {
                l._mousein = !1
            },
            this._tDom.className = "echarts-tooltip",
            this._tDom.style.position = "absolute",
            this.hasAppend = !1,
            this._axisLineShape && this.zr.delShape(this._axisLineShape.id),
            this._axisLineShape = new r({
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                invisible: !0,
                hoverable: !1
            }),
            this.shapeList.push(this._axisLineShape),
            this.zr.addShape(this._axisLineShape),
            this._axisShadowShape && this.zr.delShape(this._axisShadowShape.id),
            this._axisShadowShape = new r({
                zlevel: this.getZlevelBase(),
                z: 1,
                invisible: !0,
                hoverable: !1
            }),
            this.shapeList.push(this._axisShadowShape),
            this.zr.addShape(this._axisShadowShape),
            this._axisCrossShape && this.zr.delShape(this._axisCrossShape.id),
            this._axisCrossShape = new n({
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                invisible: !0,
                hoverable: !1
            }),
            this.shapeList.push(this._axisCrossShape),
            this.zr.addShape(this._axisCrossShape),
            this.showing = !1,
            this.refresh(s)
        }
        var i = t("./base"),
        n = t("../util/shape/Cross"),
        r = t("zrender/shape/Line"),
        o = t("zrender/shape/Rectangle"),
        s = new o({}),
        a = t("../config");
        a.tooltip = {
            zlevel: 1,
            z: 8,
            show: !0,
            showContent: !0,
            trigger: "item",
            islandFormatter: "{a} <br/>{b} : {c}",
            showDelay: 20,
            hideDelay: 100,
            transitionDuration: .4,
            enterable: !1,
            backgroundColor: "rgba(0,0,0,0.7)",
            borderColor: "#333",
            borderRadius: 4,
            borderWidth: 0,
            padding: 5,
            axisPointer: {
                type: "line",
                lineStyle: {
                    color: "#48b",
                    width: 2,
                    type: "solid"
                },
                crossStyle: {
                    color: "#1e90ff",
                    width: 1,
                    type: "dashed"
                },
                shadowStyle: {
                    color: "rgba(150,150,150,0.3)",
                    width: "auto",
                    type: "default"
                }
            },
            textStyle: {
                color: "#fff"
            }
        };
        var l = t("../util/ecData"),
        h = t("zrender/config"),
        c = t("zrender/tool/event"),
        d = t("zrender/tool/area"),
        u = t("zrender/tool/color"),
        p = t("zrender/tool/util"),
        f = t("zrender/shape/Base");
        return e.prototype = {
            type: a.COMPONENT_TYPE_TOOLTIP,
            _gCssText: "position:absolute;display:block;border-style:solid;white-space:nowrap;",
            _style: function(t) {
                if (!t) return "";
                var e = [];
                if (t.transitionDuration) {
                    var i = "left " + t.transitionDuration + "s,top " + t.transitionDuration + "s";
                    e.push("transition:" + i),
                    e.push("-moz-transition:" + i),
                    e.push("-webkit-transition:" + i),
                    e.push("-o-transition:" + i)
                }
                t.backgroundColor && (e.push("background-Color:" + u.toHex(t.backgroundColor)), e.push("filter:alpha(opacity=70)"), e.push("background-Color:" + t.backgroundColor)),
                null != t.borderWidth && e.push("border-width:" + t.borderWidth + "px"),
                null != t.borderColor && e.push("border-color:" + t.borderColor),
                null != t.borderRadius && (e.push("border-radius:" + t.borderRadius + "px"), e.push("-moz-border-radius:" + t.borderRadius + "px"), e.push("-webkit-border-radius:" + t.borderRadius + "px"), e.push("-o-border-radius:" + t.borderRadius + "px"));
                var n = t.textStyle;
                n && (n.color && e.push("color:" + n.color), n.decoration && e.push("text-decoration:" + n.decoration), n.align && e.push("text-align:" + n.align), n.fontFamily && e.push("font-family:" + n.fontFamily), n.fontSize && e.push("font-size:" + n.fontSize + "px"), n.fontSize && e.push("line-height:" + Math.round(3 * n.fontSize / 2) + "px"), n.fontStyle && e.push("font-style:" + n.fontStyle), n.fontWeight && e.push("font-weight:" + n.fontWeight));
                var r = t.padding;
                return null != r && (r = this.reformCssArray(r), e.push("padding:" + r[0] + "px " + r[1] + "px " + r[2] + "px " + r[3] + "px")),
                e = e.join(";") + ";"
            },
            __hide: function() {
                this._lastDataIndex = -1,
                this._lastSeriesIndex = -1,
                this._lastItemTriggerId = -1,
                this._tDom && (this._tDom.style.display = "none");
                var t = !1;
                this._axisLineShape.invisible || (this._axisLineShape.invisible = !0, this.zr.modShape(this._axisLineShape.id), t = !0),
                this._axisShadowShape.invisible || (this._axisShadowShape.invisible = !0, this.zr.modShape(this._axisShadowShape.id), t = !0),
                this._axisCrossShape.invisible || (this._axisCrossShape.invisible = !0, this.zr.modShape(this._axisCrossShape.id), t = !0),
                this._lastTipShape && this._lastTipShape.tipShape.length > 0 && (this.zr.delShape(this._lastTipShape.tipShape), this._lastTipShape = !1, this.shapeList.length = 2),
                t && this.zr.refreshNextFrame(),
                this.showing = !1
            },
            _show: function(t, e, i, n) {
                var r = this._tDom.offsetHeight,
                o = this._tDom.offsetWidth;
                t && ("function" == typeof t && (t = t([e, i])), t instanceof Array && (e = t[0], i = t[1])),
                e + o > this._zrWidth && (e -= o + 40),
                i + r > this._zrHeight && (i -= r - 20),
                20 > i && (i = 0),
                this._tDom.style.cssText = this._gCssText + this._defaultCssText + (n ? n: "") + "left:" + e + "px;top:" + i + "px;",
                (10 > r || 10 > o) && setTimeout(this._refixed, 20),
                this.showing = !0
            },
            __refixed: function() {
                if (this._tDom) {
                    var t = "",
                    e = this._tDom.offsetHeight,
                    i = this._tDom.offsetWidth;
                    this._tDom.offsetLeft + i > this._zrWidth && (t += "left:" + (this._zrWidth - i - 20) + "px;"),
                    this._tDom.offsetTop + e > this._zrHeight && (t += "top:" + (this._zrHeight - e - 10) + "px;"),
                    "" !== t && (this._tDom.style.cssText += t)
                }
            },
            __tryShow: function() {
                var t, e;
                if (this._curTarget) {
                    if ("island" === this._curTarget._type && this.option.tooltip.show) return void this._showItemTrigger();
                    var i = l.get(this._curTarget, "series"),
                    n = l.get(this._curTarget, "data");
                    t = this.deepQuery([n, i, this.option], "tooltip.show"),
                    null != i && null != n && t ? (e = this.deepQuery([n, i, this.option], "tooltip.trigger"), "axis" === e ? this._showAxisTrigger(i.xAxisIndex, i.yAxisIndex, l.get(this._curTarget, "dataIndex")) : this._showItemTrigger()) : (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this._hidingTicket = setTimeout(this._hide, this._hideDelay))
                } else this._findPolarTrigger() || this._findAxisTrigger()
            },
            _findAxisTrigger: function() {
                if (!this.component.xAxis || !this.component.yAxis) return void(this._hidingTicket = setTimeout(this._hide, this._hideDelay));
                for (var t, e, i = this.option.series,
                n = 0,
                r = i.length; r > n; n++) if ("axis" === this.deepQuery([i[n], this.option], "tooltip.trigger")) return t = i[n].xAxisIndex || 0,
                e = i[n].yAxisIndex || 0,
                this.component.xAxis.getAxis(t) && this.component.xAxis.getAxis(t).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? void this._showAxisTrigger(t, e, this._getNearestDataIndex("x", this.component.xAxis.getAxis(t))) : this.component.yAxis.getAxis(e) && this.component.yAxis.getAxis(e).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? void this._showAxisTrigger(t, e, this._getNearestDataIndex("y", this.component.yAxis.getAxis(e))) : void this._showAxisTrigger(t, e, -1);
                "cross" === this.option.tooltip.axisPointer.type && this._showAxisTrigger( - 1, -1, -1)
            },
            _findPolarTrigger: function() {
                if (!this.component.polar) return ! 1;
                var t, e = c.getX(this._event),
                i = c.getY(this._event),
                n = this.component.polar.getNearestIndex([e, i]);
                return n ? (t = n.valueIndex, n = n.polarIndex) : n = -1,
                -1 != n ? this._showPolarTrigger(n, t) : !1
            },
            _getNearestDataIndex: function(t, e) {
                var i = -1,
                n = c.getX(this._event),
                r = c.getY(this._event);
                if ("x" === t) {
                    for (var o, s, a = this.component.grid.getXend(), l = e.getCoordByIndex(i); a > l && (s = l, n >= l);) o = l,
                    l = e.getCoordByIndex(++i);
                    return 0 >= i ? i = 0 : s - n >= n - o ? i -= 1 : null == e.getNameByIndex(i) && (i -= 1),
                    i
                }
                for (var h, d, u = this.component.grid.getY(), l = e.getCoordByIndex(i); l > u && (h = l, l >= r);) d = l,
                l = e.getCoordByIndex(++i);
                return 0 >= i ? i = 0 : r - h >= d - r ? i -= 1 : null == e.getNameByIndex(i) && (i -= 1),
                i
            },
            _showAxisTrigger: function(t, e, i) {
                if (!this._event.connectTrigger && this.messageCenter.dispatch(a.EVENT.TOOLTIP_IN_GRID, this._event, null, this.myChart), null == this.component.xAxis || null == this.component.yAxis || null == t || null == e) return clearTimeout(this._hidingTicket),
                clearTimeout(this._showingTicket),
                void(this._hidingTicket = setTimeout(this._hide, this._hideDelay));
                var n, r, o, s, l = this.option.series,
                h = [],
                d = [],
                u = "";
                if ("axis" === this.option.tooltip.trigger) {
                    if (!this.option.tooltip.show) return;
                    r = this.option.tooltip.formatter,
                    o = this.option.tooltip.position
                }
                var p, f, g = -1 != t && this.component.xAxis.getAxis(t).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? "xAxis": -1 != e && this.component.yAxis.getAxis(e).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? "yAxis": !1;
                if (g) {
                    var m = "xAxis" == g ? t: e;
                    n = this.component[g].getAxis(m);
                    for (var _ = 0,
                    y = l.length; y > _; _++) this._isSelected(l[_].name) && l[_][g + "Index"] === m && "axis" === this.deepQuery([l[_], this.option], "tooltip.trigger") && (s = this.query(l[_], "tooltip.showContent") || s, r = this.query(l[_], "tooltip.formatter") || r, o = this.query(l[_], "tooltip.position") || o, u += this._style(this.query(l[_], "tooltip")), null != l[_].stack && "xAxis" == g ? (h.unshift(l[_]), d.unshift(_)) : (h.push(l[_]), d.push(_)));
                    this.messageCenter.dispatch(a.EVENT.TOOLTIP_HOVER, this._event, {
                        seriesIndex: d,
                        dataIndex: i
                    },
                    this.myChart);
                    var v;
                    "xAxis" == g ? (p = this.subPixelOptimize(n.getCoordByIndex(i), this._axisLineWidth), f = c.getY(this._event), v = [p, this.component.grid.getY(), p, this.component.grid.getYend()]) : (p = c.getX(this._event), f = this.subPixelOptimize(n.getCoordByIndex(i), this._axisLineWidth), v = [this.component.grid.getX(), f, this.component.grid.getXend(), f]),
                    this._styleAxisPointer(h, v[0], v[1], v[2], v[3], n.getGap(), p, f)
                } else p = c.getX(this._event),
                f = c.getY(this._event),
                this._styleAxisPointer(l, this.component.grid.getX(), f, this.component.grid.getXend(), f, 0, p, f),
                i >= 0 ? this._showItemTrigger(!0) : (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this._tDom.style.display = "none");
                if (h.length > 0) {
                    if (this._lastItemTriggerId = -1, this._lastDataIndex != i || this._lastSeriesIndex != d[0]) {
                        this._lastDataIndex = i,
                        this._lastSeriesIndex = d[0];
                        var b, x;
                        if ("function" == typeof r) {
                            for (var T = [], _ = 0, y = h.length; y > _; _++) b = h[_].data[i],
                            x = this.getDataFromOption(b, "-"),
                            T.push({
                                seriesIndex: d[_],
                                seriesName: h[_].name || "",
                                series: h[_],
                                dataIndex: i,
                                data: b,
                                name: n.getNameByIndex(i),
                                value: x,
                                0 : h[_].name || "",
                                1 : n.getNameByIndex(i),
                                2 : x,
                                3 : b
                            });
                            this._curTicket = "axis:" + i,
                            this._tDom.innerHTML = r.call(this.myChart, T, this._curTicket, this._setContent)
                        } else if ("string" == typeof r) {
                            this._curTicket = 0 / 0,
                            r = r.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}");
                            for (var _ = 0,
                            y = h.length; y > _; _++) r = r.replace("{a" + _ + "}", this._encodeHTML(h[_].name || "")),
                            r = r.replace("{b" + _ + "}", this._encodeHTML(n.getNameByIndex(i))),
                            b = h[_].data[i],
                            b = this.getDataFromOption(b, "-"),
                            r = r.replace("{c" + _ + "}", b instanceof Array ? b: this.numAddCommas(b));
                            this._tDom.innerHTML = r
                        } else {
                            this._curTicket = 0 / 0,
                            r = this._encodeHTML(n.getNameByIndex(i));
                            for (var _ = 0,
                            y = h.length; y > _; _++) r += "<br/>" + this._encodeHTML(h[_].name || "") + " : ",
                            b = h[_].data[i],
                            b = this.getDataFromOption(b, "-"),
                            r += b instanceof Array ? b: this.numAddCommas(b);
                            this._tDom.innerHTML = r
                        }
                    }
                    if (s === !1 || !this.option.tooltip.showContent) return;
                    this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0),
                    this._show(o, p + 10, f + 10, u)
                }
            },
            _showPolarTrigger: function(t, e) {
                if (null == this.component.polar || null == t || null == e || 0 > e) return ! 1;
                var i, n, r, o = this.option.series,
                s = [],
                a = [],
                l = "";
                if ("axis" === this.option.tooltip.trigger) {
                    if (!this.option.tooltip.show) return ! 1;
                    i = this.option.tooltip.formatter,
                    n = this.option.tooltip.position
                }
                for (var h = this.option.polar[t].indicator[e].text, d = 0, u = o.length; u > d; d++) this._isSelected(o[d].name) && o[d].polarIndex === t && "axis" === this.deepQuery([o[d], this.option], "tooltip.trigger") && (r = this.query(o[d], "tooltip.showContent") || r, i = this.query(o[d], "tooltip.formatter") || i, n = this.query(o[d], "tooltip.position") || n, l += this._style(this.query(o[d], "tooltip")), s.push(o[d]), a.push(d));
                if (s.length > 0) {
                    for (var p, f, g, m = [], d = 0, u = s.length; u > d; d++) {
                        p = s[d].data;
                        for (var _ = 0,
                        y = p.length; y > _; _++) f = p[_],
                        this._isSelected(f.name) && (f = null != f ? f: {
                            name: "",
                            value: {
                                dataIndex: "-"
                            }
                        },
                        g = this.getDataFromOption(f.value[e]), m.push({
                            seriesIndex: a[d],
                            seriesName: s[d].name || "",
                            series: s[d],
                            dataIndex: e,
                            data: f,
                            name: f.name,
                            indicator: h,
                            value: g,
                            0 : s[d].name || "",
                            1 : f.name,
                            2 : g,
                            3 : h
                        }))
                    }
                    if (m.length <= 0) return;
                    if (this._lastItemTriggerId = -1, this._lastDataIndex != e || this._lastSeriesIndex != a[0]) if (this._lastDataIndex = e, this._lastSeriesIndex = a[0], "function" == typeof i) this._curTicket = "axis:" + e,
                    this._tDom.innerHTML = i.call(this.myChart, m, this._curTicket, this._setContent);
                    else if ("string" == typeof i) {
                        i = i.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}").replace("{d}", "{d0}");
                        for (var d = 0,
                        u = m.length; u > d; d++) i = i.replace("{a" + d + "}", this._encodeHTML(m[d].seriesName)),
                        i = i.replace("{b" + d + "}", this._encodeHTML(m[d].name)),
                        i = i.replace("{c" + d + "}", this.numAddCommas(m[d].value)),
                        i = i.replace("{d" + d + "}", this._encodeHTML(m[d].indicator));
                        this._tDom.innerHTML = i
                    } else {
                        i = this._encodeHTML(m[0].name) + "<br/>" + this._encodeHTML(m[0].indicator) + " : " + this.numAddCommas(m[0].value);
                        for (var d = 1,
                        u = m.length; u > d; d++) i += "<br/>" + this._encodeHTML(m[d].name) + "<br/>",
                        i += this._encodeHTML(m[d].indicator) + " : " + this.numAddCommas(m[d].value);
                        this._tDom.innerHTML = i
                    }
                    if (r === !1 || !this.option.tooltip.showContent) return;
                    return this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0),
                    this._show(n, c.getX(this._event), c.getY(this._event), l),
                    !0
                }
            },
            _showItemTrigger: function(t) {
                if (this._curTarget) {
                    var e, i, n, r = l.get(this._curTarget, "series"),
                    o = l.get(this._curTarget, "seriesIndex"),
                    s = l.get(this._curTarget, "data"),
                    h = l.get(this._curTarget, "dataIndex"),
                    d = l.get(this._curTarget, "name"),
                    u = l.get(this._curTarget, "value"),
                    p = l.get(this._curTarget, "special"),
                    f = l.get(this._curTarget, "special2"),
                    g = [s, r, this.option],
                    m = "";
                    if ("island" != this._curTarget._type) {
                        var _ = t ? "axis": "item";
                        this.option.tooltip.trigger === _ && (e = this.option.tooltip.formatter, i = this.option.tooltip.position),
                        this.query(r, "tooltip.trigger") === _ && (n = this.query(r, "tooltip.showContent") || n, e = this.query(r, "tooltip.formatter") || e, i = this.query(r, "tooltip.position") || i, m += this._style(this.query(r, "tooltip"))),
                        n = this.query(s, "tooltip.showContent") || n,
                        e = this.query(s, "tooltip.formatter") || e,
                        i = this.query(s, "tooltip.position") || i,
                        m += this._style(this.query(s, "tooltip"))
                    } else this._lastItemTriggerId = 0 / 0,
                    n = this.deepQuery(g, "tooltip.showContent"),
                    e = this.deepQuery(g, "tooltip.islandFormatter"),
                    i = this.deepQuery(g, "tooltip.islandPosition");
                    this._lastDataIndex = -1,
                    this._lastSeriesIndex = -1,
                    this._lastItemTriggerId !== this._curTarget.id && (this._lastItemTriggerId = this._curTarget.id, "function" == typeof e ? (this._curTicket = (r.name || "") + ":" + h, this._tDom.innerHTML = e.call(this.myChart, {
                        seriesIndex: o,
                        seriesName: r.name || "",
                        series: r,
                        dataIndex: h,
                        data: s,
                        name: d,
                        value: u,
                        percent: p,
                        indicator: p,
                        value2: f,
                        indicator2: f,
                        0 : r.name || "",
                        1 : d,
                        2 : u,
                        3 : p,
                        4 : f,
                        5 : s,
                        6 : o,
                        7 : h
                    },
                    this._curTicket, this._setContent)) : "string" == typeof e ? (this._curTicket = 0 / 0, e = e.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}"), e = e.replace("{a0}", this._encodeHTML(r.name || "")).replace("{b0}", this._encodeHTML(d)).replace("{c0}", u instanceof Array ? u: this.numAddCommas(u)), e = e.replace("{d}", "{d0}").replace("{d0}", p || ""), e = e.replace("{e}", "{e0}").replace("{e0}", l.get(this._curTarget, "special2") || ""), this._tDom.innerHTML = e) : (this._curTicket = 0 / 0, this._tDom.innerHTML = r.type === a.CHART_TYPE_RADAR && p ? this._itemFormatter.radar.call(this, r, d, u, p) : r.type === a.CHART_TYPE_EVENTRIVER ? this._itemFormatter.eventRiver.call(this, r, d, u, s) : "" + (null != r.name ? this._encodeHTML(r.name) + "<br/>": "") + ("" === d ? "": this._encodeHTML(d) + " : ") + (u instanceof Array ? u: this.numAddCommas(u))));
                    var y = c.getX(this._event),
                    v = c.getY(this._event);
                    this.deepQuery(g, "tooltip.axisPointer.show") && this.component.grid ? this._styleAxisPointer([r], this.component.grid.getX(), v, this.component.grid.getXend(), v, 0, y, v) : this._hide(),
                    n !== !1 && this.option.tooltip.showContent && (this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0), this._show(i, y + 20, v - 20, m))
                }
            },
            _itemFormatter: {
                radar: function(t, e, i, n) {
                    var r = "";
                    r += this._encodeHTML("" === e ? t.name || "": e),
                    r += "" === r ? "": "<br />";
                    for (var o = 0; o < n.length; o++) r += this._encodeHTML(n[o].text) + " : " + this.numAddCommas(i[o]) + "<br />";
                    return r
                },
                chord: function(t, e, i, n, r) {
                    if (null == r) return this._encodeHTML(e) + " (" + this.numAddCommas(i) + ")";
                    var o = this._encodeHTML(e),
                    s = this._encodeHTML(n);
                    return "" + (null != t.name ? this._encodeHTML(t.name) + "<br/>": "") + o + " -> " + s + " (" + this.numAddCommas(i) + ")<br />" + s + " -> " + o + " (" + this.numAddCommas(r) + ")"
                },
                eventRiver: function(t, e, i, n) {
                    var r = "";
                    r += this._encodeHTML("" === t.name ? "": t.name + " : "),
                    r += this._encodeHTML(e),
                    r += "" === r ? "": "<br />",
                    n = n.evolution;
                    for (var o = 0,
                    s = n.length; s > o; o++) r += '<div style="padding-top:5px;">',
                    n[o].detail && (n[o].detail.img && (r += '<img src="' + n[o].detail.img + '" style="float:left;width:40px;height:40px;">'), r += '<div style="margin-left:45px;">' + n[o].time + "<br/>", r += '<a href="' + n[o].detail.link + '" target="_blank">', r += n[o].detail.text + "</a></div>", r += "</div>");
                    return r
                }
            },
            _styleAxisPointer: function(t, e, i, n, r, o, s, a) {
                if (t.length > 0) {
                    var l, h, c = this.option.tooltip.axisPointer,
                    d = c.type,
                    u = {
                        line: {},
                        cross: {},
                        shadow: {}
                    };
                    for (var p in u) u[p].color = c[p + "Style"].color,
                    u[p].width = c[p + "Style"].width,
                    u[p].type = c[p + "Style"].type;
                    for (var f = 0,
                    g = t.length; g > f; f++) l = t[f],
                    h = this.query(l, "tooltip.axisPointer.type"),
                    d = h || d,
                    h && (u[h].color = this.query(l, "tooltip.axisPointer." + h + "Style.color") || u[h].color, u[h].width = this.query(l, "tooltip.axisPointer." + h + "Style.width") || u[h].width, u[h].type = this.query(l, "tooltip.axisPointer." + h + "Style.type") || u[h].type);
                    if ("line" === d) {
                        var m = u.line.width,
                        _ = e == n;
                        this._axisLineShape.style = {
                            xStart: _ ? this.subPixelOptimize(e, m) : e,
                            yStart: _ ? i: this.subPixelOptimize(i, m),
                            xEnd: _ ? this.subPixelOptimize(n, m) : n,
                            yEnd: _ ? r: this.subPixelOptimize(r, m),
                            strokeColor: u.line.color,
                            lineWidth: m,
                            lineType: u.line.type
                        },
                        this._axisLineShape.invisible = !1,
                        this.zr.modShape(this._axisLineShape.id)
                    } else if ("cross" === d) {
                        var y = u.cross.width;
                        this._axisCrossShape.style = {
                            brushType: "stroke",
                            rect: this.component.grid.getArea(),
                            x: this.subPixelOptimize(s, y),
                            y: this.subPixelOptimize(a, y),
                            text: ("( " + this.component.xAxis.getAxis(0).getValueFromCoord(s) + " , " + this.component.yAxis.getAxis(0).getValueFromCoord(a) + " )").replace("  , ", " ").replace(" ,  ", " "),
                            textPosition: "specific",
                            strokeColor: u.cross.color,
                            lineWidth: y,
                            lineType: u.cross.type
                        },
                        this.component.grid.getXend() - s > 100 ? (this._axisCrossShape.style.textAlign = "left", this._axisCrossShape.style.textX = s + 10) : (this._axisCrossShape.style.textAlign = "right", this._axisCrossShape.style.textX = s - 10),
                        a - this.component.grid.getY() > 50 ? (this._axisCrossShape.style.textBaseline = "bottom", this._axisCrossShape.style.textY = a - 10) : (this._axisCrossShape.style.textBaseline = "top", this._axisCrossShape.style.textY = a + 10),
                        this._axisCrossShape.invisible = !1,
                        this.zr.modShape(this._axisCrossShape.id)
                    } else "shadow" === d && ((null == u.shadow.width || "auto" === u.shadow.width || isNaN(u.shadow.width)) && (u.shadow.width = o), e === n ? Math.abs(this.component.grid.getX() - e) < 2 ? (u.shadow.width /= 2, e = n += u.shadow.width / 2) : Math.abs(this.component.grid.getXend() - e) < 2 && (u.shadow.width /= 2, e = n -= u.shadow.width / 2) : i === r && (Math.abs(this.component.grid.getY() - i) < 2 ? (u.shadow.width /= 2, i = r += u.shadow.width / 2) : Math.abs(this.component.grid.getYend() - i) < 2 && (u.shadow.width /= 2, i = r -= u.shadow.width / 2)), this._axisShadowShape.style = {
                        xStart: e,
                        yStart: i,
                        xEnd: n,
                        yEnd: r,
                        strokeColor: u.shadow.color,
                        lineWidth: u.shadow.width
                    },
                    this._axisShadowShape.invisible = !1, this.zr.modShape(this._axisShadowShape.id));
                    this.zr.refreshNextFrame()
                }
            },
            __onmousemove: function(t) {
                if (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), !this._mousein || !this._enterable) {
                    var e = t.target,
                    i = c.getX(t.event),
                    n = c.getY(t.event);
                    if (e) {
                        this._curTarget = e,
                        this._event = t.event,
                        this._event.zrenderX = i,
                        this._event.zrenderY = n;
                        var r;
                        if (this._needAxisTrigger && this.component.polar && -1 != (r = this.component.polar.isInside([i, n]))) for (var o = this.option.series,
                        l = 0,
                        h = o.length; h > l; l++) if (o[l].polarIndex === r && "axis" === this.deepQuery([o[l], this.option], "tooltip.trigger")) {
                            this._curTarget = null;
                            break
                        }
                        this._showingTicket = setTimeout(this._tryShow, this._showDelay)
                    } else this._curTarget = !1,
                    this._event = t.event,
                    this._event.zrenderX = i,
                    this._event.zrenderY = n,
                    this._needAxisTrigger && this.component.grid && d.isInside(s, this.component.grid.getArea(), i, n) ? this._showingTicket = setTimeout(this._tryShow, this._showDelay) : this._needAxisTrigger && this.component.polar && -1 != this.component.polar.isInside([i, n]) ? this._showingTicket = setTimeout(this._tryShow, this._showDelay) : (!this._event.connectTrigger && this.messageCenter.dispatch(a.EVENT.TOOLTIP_OUT_GRID, this._event, null, this.myChart), this._hidingTicket = setTimeout(this._hide, this._hideDelay))
                }
            },
            __onglobalout: function() {
                clearTimeout(this._hidingTicket),
                clearTimeout(this._showingTicket),
                this._hidingTicket = setTimeout(this._hide, this._hideDelay)
            },
            __setContent: function(t, e) {
                this._tDom && (t === this._curTicket && (this._tDom.innerHTML = e), setTimeout(this._refixed, 20))
            },
            ontooltipHover: function(t, e) {
                if (!this._lastTipShape || this._lastTipShape && this._lastTipShape.dataIndex != t.dataIndex) {
                    this._lastTipShape && this._lastTipShape.tipShape.length > 0 && (this.zr.delShape(this._lastTipShape.tipShape), this.shapeList.length = 2);
                    for (var i = 0,
                    n = e.length; n > i; i++) e[i].zlevel = this.getZlevelBase(),
                    e[i].z = this.getZBase(),
                    e[i].style = f.prototype.getHighlightStyle(e[i].style, e[i].highlightStyle),
                    e[i].draggable = !1,
                    e[i].hoverable = !1,
                    e[i].clickable = !1,
                    e[i].ondragend = null,
                    e[i].ondragover = null,
                    e[i].ondrop = null,
                    this.shapeList.push(e[i]),
                    this.zr.addShape(e[i]);
                    this._lastTipShape = {
                        dataIndex: t.dataIndex,
                        tipShape: e
                    }
                }
            },
            ondragend: function() {
                this._hide()
            },
            onlegendSelected: function(t) {
                this._selectedMap = t.selected
            },
            _setSelectedMap: function() {
                this._selectedMap = this.component.legend ? p.clone(this.component.legend.getSelectedMap()) : {}
            },
            _isSelected: function(t) {
                return null != this._selectedMap[t] ? this._selectedMap[t] : !0
            },
            showTip: function(t) {
                if (t) {
                    var e, i = this.option.series;
                    if (null != t.seriesIndex) e = t.seriesIndex;
                    else for (var n = t.seriesName,
                    r = 0,
                    o = i.length; o > r; r++) if (i[r].name === n) {
                        e = r;
                        break
                    }
                    var s = i[e];
                    if (null != s) {
                        var c = this.myChart.chart[s.type],
                        d = "axis" === this.deepQuery([s, this.option], "tooltip.trigger");
                        if (c) if (d) {
                            var u = t.dataIndex;
                            switch (c.type) {
                            case a.CHART_TYPE_LINE:
                            case a.CHART_TYPE_BAR:
                            case a.CHART_TYPE_K:
                            case a.CHART_TYPE_RADAR:
                                if (null == this.component.polar || s.data[0].value.length <= u) return;
                                var p = s.polarIndex || 0,
                                f = this.component.polar.getVector(p, u, "max");
                                this._event = {
                                    zrenderX: f[0],
                                    zrenderY: f[1]
                                },
                                this._showPolarTrigger(p, u)
                            }
                        } else {
                            var g, m, _ = c.shapeList;
                            switch (c.type) {
                            case a.CHART_TYPE_LINE:
                            case a.CHART_TYPE_BAR:
                            case a.CHART_TYPE_K:
                            case a.CHART_TYPE_TREEMAP:
                            case a.CHART_TYPE_SCATTER:
                                for (var u = t.dataIndex,
                                r = 0,
                                o = _.length; o > r; r++) if (null == _[r]._mark && l.get(_[r], "seriesIndex") == e && l.get(_[r], "dataIndex") == u) {
                                    this._curTarget = _[r],
                                    g = _[r].style.x,
                                    m = c.type != a.CHART_TYPE_K ? _[r].style.y: _[r].style.y[0];
                                    break
                                }
                                break;
                            case a.CHART_TYPE_RADAR:
                                for (var u = t.dataIndex,
                                r = 0,
                                o = _.length; o > r; r++) if ("polygon" === _[r].type && l.get(_[r], "seriesIndex") == e && l.get(_[r], "dataIndex") == u) {
                                    this._curTarget = _[r];
                                    var f = this.component.polar.getCenter(s.polarIndex || 0);
                                    g = f[0],
                                    m = f[1];
                                    break
                                }
                                break;
                            case a.CHART_TYPE_PIE:
                                for (var y = t.name,
                                r = 0,
                                o = _.length; o > r; r++) if ("sector" === _[r].type && l.get(_[r], "seriesIndex") == e && l.get(_[r], "name") == y) {
                                    this._curTarget = _[r];
                                    var v = this._curTarget.style,
                                    b = (v.startAngle + v.endAngle) / 2 * Math.PI / 180;
                                    g = this._curTarget.style.x + Math.cos(b) * v.r / 1.5,
                                    m = this._curTarget.style.y - Math.sin(b) * v.r / 1.5;
                                    break
                                }
                                break;
                            case a.CHART_TYPE_MAP:
                                for (var y = t.name,
                                x = s.mapType,
                                r = 0,
                                o = _.length; o > r; r++) if ("text" === _[r].type && _[r]._mapType === x && _[r].style._name === y) {
                                    this._curTarget = _[r],
                                    g = this._curTarget.style.x + this._curTarget.position[0],
                                    m = this._curTarget.style.y + this._curTarget.position[1];
                                    break
                                }
                                break;
                            case a.CHART_TYPE_CHORD:
                                for (var y = t.name,
                                r = 0,
                                o = _.length; o > r; r++) if ("sector" === _[r].type && l.get(_[r], "name") == y) {
                                    this._curTarget = _[r];
                                    var v = this._curTarget.style,
                                    b = (v.startAngle + v.endAngle) / 2 * Math.PI / 180;
                                    return g = this._curTarget.style.x + Math.cos(b) * (v.r - 2),
                                    m = this._curTarget.style.y - Math.sin(b) * (v.r - 2),
                                    void this.zr.trigger(h.EVENT.MOUSEMOVE, {
                                        zrenderX: g,
                                        zrenderY: m
                                    })
                                }
                                break;
                            case a.CHART_TYPE_FORCE:
                                for (var y = t.name,
                                r = 0,
                                o = _.length; o > r; r++) if ("circle" === _[r].type && l.get(_[r], "name") == y) {
                                    this._curTarget = _[r],
                                    g = this._curTarget.position[0],
                                    m = this._curTarget.position[1];
                                    break
                                }
                            }
                            null != g && null != m && (this._event = {
                                zrenderX: g,
                                zrenderY: m
                            },
                            this.zr.addHoverShape(this._curTarget), this.zr.refreshHover(), this._showItemTrigger())
                        }
                    }
                }
            },
            hideTip: function() {
                this._hide()
            },
            refresh: function(t) {
                if (this._zrHeight = this.zr.getHeight(), this._zrWidth = this.zr.getWidth(), this._lastTipShape && this._lastTipShape.tipShape.length > 0 && this.zr.delShape(this._lastTipShape.tipShape), this._lastTipShape = !1, this.shapeList.length = 2, this._lastDataIndex = -1, this._lastSeriesIndex = -1, this._lastItemTriggerId = -1, t) {
                    this.option = t,
                    this.option.tooltip = this.reformOption(this.option.tooltip),
                    this.option.tooltip.textStyle = p.merge(this.option.tooltip.textStyle, this.ecTheme.textStyle),
                    this._needAxisTrigger = !1,
                    "axis" === this.option.tooltip.trigger && (this._needAxisTrigger = !0);
                    for (var e = this.option.series,
                    i = 0,
                    n = e.length; n > i; i++) if ("axis" === this.query(e[i], "tooltip.trigger")) {
                        this._needAxisTrigger = !0;
                        break
                    }
                    this._showDelay = this.option.tooltip.showDelay,
                    this._hideDelay = this.option.tooltip.hideDelay,
                    this._defaultCssText = this._style(this.option.tooltip),
                    this._setSelectedMap(),
                    this._axisLineWidth = this.option.tooltip.axisPointer.lineStyle.width,
                    this._enterable = this.option.tooltip.enterable
                }
                if (this.showing) {
                    var r = this;
                    setTimeout(function() {
                        r.zr.trigger(h.EVENT.MOUSEMOVE, r.zr.handler._event)
                    },
                    50)
                }
            },
            onbeforDispose: function() {
                this._lastTipShape && this._lastTipShape.tipShape.length > 0 && this.zr.delShape(this._lastTipShape.tipShape),
                clearTimeout(this._hidingTicket),
                clearTimeout(this._showingTicket),
                this.zr.un(h.EVENT.MOUSEMOVE, this._onmousemove),
                this.zr.un(h.EVENT.GLOBALOUT, this._onglobalout),
                this.hasAppend && this.dom.firstChild && this.dom.firstChild.removeChild(this._tDom),
                this._tDom = null
            },
            _encodeHTML: function(t) {
                return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
            }
        },
        p.inherits(e, i),
        t("../component").define("tooltip", e),
        e
    }),
    i("zrender/loadingEffect/Whirling", ["require", "./Base", "../tool/util", "../tool/area", "../shape/Ring", "../shape/Droplet", "../shape/Circle"],
    function(t) {
        function e(t) {
            i.call(this, t)
        }
        var i = t("./Base"),
        n = t("../tool/util"),
        r = t("../tool/area"),
        o = t("../shape/Ring"),
        s = t("../shape/Droplet"),
        a = t("../shape/Circle");
        return n.inherits(e, i),
        e.prototype._start = function(t, e) {
            var i = n.merge(this.options, {
                textStyle: {
                    color: "#888",
                    textAlign: "start"
                },
                backgroundColor: "rgba(250, 250, 250, 0.8)"
            }),
            l = this.createTextShape(i.textStyle),
            h = 10,
            c = r.getTextWidth(l.highlightStyle.text, l.highlightStyle.textFont),
            d = r.getTextHeight(l.highlightStyle.text, l.highlightStyle.textFont),
            u = n.merge(this.options.effect || {},
            {
                r: 18,
                colorIn: "#fff",
                colorOut: "#555",
                colorWhirl: "#6cf",
                timeInterval: 50
            }),
            p = this.getLocation(this.options.textStyle, c + h + 2 * u.r, Math.max(2 * u.r, d));
            u.x = p.x + u.r,
            u.y = l.highlightStyle.y = p.y + p.height / 2,
            l.highlightStyle.x = u.x + u.r + h;
            var f = this.createBackgroundShape(i.backgroundColor),
            g = new s({
                highlightStyle: {
                    a: Math.round(u.r / 2),
                    b: Math.round(u.r - u.r / 6),
                    brushType: "fill",
                    color: u.colorWhirl
                }
            }),
            m = new a({
                highlightStyle: {
                    r: Math.round(u.r / 6),
                    brushType: "fill",
                    color: u.colorIn
                }
            }),
            _ = new o({
                highlightStyle: {
                    r0: Math.round(u.r - u.r / 3),
                    r: u.r,
                    brushType: "fill",
                    color: u.colorOut
                }
            }),
            y = [0, u.x, u.y];
            return g.highlightStyle.x = m.highlightStyle.x = _.highlightStyle.x = y[1],
            g.highlightStyle.y = m.highlightStyle.y = _.highlightStyle.y = y[2],
            setInterval(function() {
                t(f),
                t(_),
                y[0] -= .3,
                g.rotation = y,
                t(g),
                t(m),
                t(l),
                e()
            },
            u.timeInterval)
        },
        e
    }),
    i("zrender/loadingEffect/DynamicLine", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Line"],
    function(t) {
        function e(t) {
            i.call(this, t)
        }
        var i = t("./Base"),
        n = t("../tool/util"),
        r = t("../tool/color"),
        o = t("../shape/Line");
        return n.inherits(e, i),
        e.prototype._start = function(t, e) {
            for (var i = n.merge(this.options, {
                textStyle: {
                    color: "#fff"
                },
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                effectOption: {
                    n: 30,
                    lineWidth: 1,
                    color: "random",
                    timeInterval: 100
                }
            }), s = this.createTextShape(i.textStyle), a = this.createBackgroundShape(i.backgroundColor), l = i.effectOption, h = l.n, c = l.lineWidth, d = [], u = this.canvasWidth, p = this.canvasHeight, f = 0; h > f; f++) {
                var g = -Math.ceil(1e3 * Math.random()),
                m = Math.ceil(400 * Math.random()),
                _ = Math.ceil(Math.random() * p),
                y = "random" == l.color ? r.random() : l.color;
                d[f] = new o({
                    highlightStyle: {
                        xStart: g,
                        yStart: _,
                        xEnd: g + m,
                        yEnd: _,
                        strokeColor: y,
                        lineWidth: c
                    },
                    animationX: Math.ceil(100 * Math.random()),
                    len: m
                })
            }
            return setInterval(function() {
                t(a);
                for (var i = 0; h > i; i++) {
                    var n = d[i].highlightStyle;
                    n.xStart >= u && (d[i].len = Math.ceil(400 * Math.random()), n.xStart = -400, n.xEnd = -400 + d[i].len, n.yStart = Math.ceil(Math.random() * p), n.yEnd = n.yStart),
                    n.xStart += d[i].animationX,
                    n.xEnd += d[i].animationX,
                    t(d[i])
                }
                t(s),
                e()
            },
            l.timeInterval)
        },
        e
    }),
    i("zrender/loadingEffect/Ring", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Ring", "../shape/Sector"],
    function(t) {
        function e(t) {
            i.call(this, t)
        }
        var i = t("./Base"),
        n = t("../tool/util"),
        r = t("../tool/color"),
        o = t("../shape/Ring"),
        s = t("../shape/Sector");
        return n.inherits(e, i),
        e.prototype._start = function(t, e) {
            var i = n.merge(this.options, {
                textStyle: {
                    color: "#07a"
                },
                backgroundColor: "rgba(250, 250, 250, 0.8)",
                effect: {
                    x: this.canvasWidth / 2,
                    y: this.canvasHeight / 2,
                    r0: 60,
                    r: 100,
                    color: "#bbdcff",
                    brushType: "fill",
                    textPosition: "inside",
                    textFont: "normal 30px verdana",
                    textColor: "rgba(30, 144, 255, 0.6)",
                    timeInterval: 100
                }
            }),
            a = i.effect,
            l = i.textStyle;
            null == l.x && (l.x = a.x),
            null == l.y && (l.y = a.y + (a.r0 + a.r) / 2 - 5);
            for (var h = this.createTextShape(i.textStyle), c = this.createBackgroundShape(i.backgroundColor), d = a.x, u = a.y, p = a.r0 + 6, f = a.r - 6, g = a.color, m = r.lift(g, .1), _ = new o({
                highlightStyle: n.clone(a)
            }), y = [], v = r.getGradientColors(["#ff6400", "#ffe100", "#97ff00"], 25), b = 15, x = 240, T = 0; 16 > T; T++) y.push(new s({
                highlightStyle: {
                    x: d,
                    y: u,
                    r0: p,
                    r: f,
                    startAngle: x - b,
                    endAngle: x,
                    brushType: "fill",
                    color: m
                },
                _color: r.getLinearGradient(d + p * Math.cos(x, !0), u - p * Math.sin(x, !0), d + p * Math.cos(x - b, !0), u - p * Math.sin(x - b, !0), [[0, v[2 * T]], [1, v[2 * T + 1]]])
            })),
            x -= b;
            x = 360;
            for (var T = 0; 4 > T; T++) y.push(new s({
                highlightStyle: {
                    x: d,
                    y: u,
                    r0: p,
                    r: f,
                    startAngle: x - b,
                    endAngle: x,
                    brushType: "fill",
                    color: m
                },
                _color: r.getLinearGradient(d + p * Math.cos(x, !0), u - p * Math.sin(x, !0), d + p * Math.cos(x - b, !0), u - p * Math.sin(x - b, !0), [[0, v[2 * T + 32]], [1, v[2 * T + 33]]])
            })),
            x -= b;
            var w = 0;
            if (null != i.progress) {
                t(c),
                w = 100 * this.adjust(i.progress, [0, 1]).toFixed(2) / 5,
                _.highlightStyle.text = 5 * w + "%",
                t(_);
                for (var T = 0; 20 > T; T++) y[T].highlightStyle.color = w > T ? y[T]._color: m,
                t(y[T]);
                return t(h),
                void e()
            }
            return setInterval(function() {
                t(c),
                w += w >= 20 ? -20 : 1,
                t(_);
                for (var i = 0; 20 > i; i++) y[i].highlightStyle.color = w > i ? y[i]._color: m,
                t(y[i]);
                t(h),
                e()
            },
            a.timeInterval)
        },
        e
    }),
    i("echarts/theme/macarons", [],
    function() {
        var t = {
            color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3", "#e5cf0d", "#97b552", "#95706d", "#dc69aa", "#07a2a4", "#9a7fd1", "#588dd5", "#f5994e", "#c05050", "#59678c", "#c9ab00", "#7eb00a", "#6f5553", "#c14089"],
            title: {
                textStyle: {
                    fontWeight: "normal",
                    color: "#008acd"
                }
            },
            dataRange: {
                itemWidth: 15,
                color: ["#5ab1ef", "#e0ffff"]
            },
            toolbox: {
                color: ["#1e90ff", "#1e90ff", "#1e90ff", "#1e90ff"],
                effectiveColor: "#ff4500"
            },
            tooltip: {
                backgroundColor: "rgba(50,50,50,0.5)",
                axisPointer: {
                    type: "line",
                    lineStyle: {
                        color: "#008acd"
                    },
                    crossStyle: {
                        color: "#008acd"
                    },
                    shadowStyle: {
                        color: "rgba(200,200,200,0.2)"
                    }
                }
            },
            dataZoom: {
                dataBackgroundColor: "#efefff",
                fillerColor: "rgba(182,162,222,0.2)",
                handleColor: "#008acd"
            },
            grid: {
                borderColor: "#eee"
            },
            categoryAxis: {
                axisLine: {
                    lineStyle: {
                        color: "#008acd"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: ["#eee"]
                    }
                }
            },
            valueAxis: {
                axisLine: {
                    lineStyle: {
                        color: "#008acd"
                    }
                },
                splitArea: {
                    show: !0,
                    areaStyle: {
                        color: ["rgba(250,250,250,0.1)", "rgba(200,200,200,0.1)"]
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: ["#eee"]
                    }
                }
            },
            polar: {
                axisLine: {
                    lineStyle: {
                        color: "#ddd"
                    }
                },
                splitArea: {
                    show: !0,
                    areaStyle: {
                        color: ["rgba(250,250,250,0.2)", "rgba(200,200,200,0.2)"]
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "#ddd"
                    }
                }
            },
            timeline: {
                lineStyle: {
                    color: "#008acd"
                },
                controlStyle: {
                    normal: {
                        color: "#008acd"
                    },
                    emphasis: {
                        color: "#008acd"
                    }
                },
                symbol: "emptyCircle",
                symbolSize: 3
            },
            bar: {
                itemStyle: {
                    normal: {
                        barBorderRadius: 5
                    },
                    emphasis: {
                        barBorderRadius: 5
                    }
                }
            },
            line: {
                smooth: !0,
                symbol: "emptyCircle",
                symbolSize: 3
            },
            k: {
                itemStyle: {
                    normal: {
                        color: "#d87a80",
                        color0: "#2ec7c9",
                        lineStyle: {
                            color: "#d87a80",
                            color0: "#2ec7c9"
                        }
                    }
                }
            },
            scatter: {
                symbol: "circle",
                symbolSize: 4
            },
            radar: {
                symbol: "emptyCircle",
                symbolSize: 3
            },
            map: {
                itemStyle: {
                    normal: {
                        areaStyle: {
                            color: "#ddd"
                        },
                        label: {
                            textStyle: {
                                color: "#d87a80"
                            }
                        }
                    },
                    emphasis: {
                        areaStyle: {
                            color: "#fe994e"
                        }
                    }
                }
            },
            force: {
                itemStyle: {
                    normal: {
                        linkStyle: {
                            color: "#1e90ff"
                        }
                    }
                }
            },
            chord: {
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: "rgba(128, 128, 128, 0.5)",
                        chordStyle: {
                            lineStyle: {
                                color: "rgba(128, 128, 128, 0.5)"
                            }
                        }
                    },
                    emphasis: {
                        borderWidth: 1,
                        borderColor: "rgba(128, 128, 128, 0.5)",
                        chordStyle: {
                            lineStyle: {
                                color: "rgba(128, 128, 128, 0.5)"
                            }
                        }
                    }
                }
            },
            gauge: {
                axisLine: {
                    lineStyle: {
                        color: [[.2, "#2ec7c9"], [.8, "#5ab1ef"], [1, "#d87a80"]],
                        width: 10
                    }
                },
                axisTick: {
                    splitNumber: 10,
                    length: 15,
                    lineStyle: {
                        color: "auto"
                    }
                },
                splitLine: {
                    length: 22,
                    lineStyle: {
                        color: "auto"
                    }
                },
                pointer: {
                    width: 5
                }
            },
            textStyle: {
                fontFamily: "微软雅黑, Arial, Verdana, sans-serif"
            }
        };
        return t
    }),
    i("echarts/theme/infographic", [],
    function() {
        var t = {
            color: ["#C1232B", "#B5C334", "#FCCE10", "#E87C25", "#27727B", "#FE8463", "#9BCA63", "#FAD860", "#F3A43B", "#60C0DD", "#D7504B", "#C6E579", "#F4E001", "#F0805A", "#26C0C0"],
            title: {
                textStyle: {
                    fontWeight: "normal",
                    color: "#27727B"
                }
            },
            dataRange: {
                x: "right",
                y: "center",
                itemWidth: 5,
                itemHeight: 25,
                color: ["#C1232B", "#FCCE10"]
            },
            toolbox: {
                color: ["#C1232B", "#B5C334", "#FCCE10", "#E87C25", "#27727B", "#FE8463", "#9BCA63", "#FAD860", "#F3A43B", "#60C0DD"],
                effectiveColor: "#ff4500"
            },
            tooltip: {
                backgroundColor: "rgba(50,50,50,0.5)",
                axisPointer: {
                    type: "line",
                    lineStyle: {
                        color: "#27727B",
                        type: "dashed"
                    },
                    crossStyle: {
                        color: "#27727B"
                    },
                    shadowStyle: {
                        color: "rgba(200,200,200,0.3)"
                    }
                }
            },
            dataZoom: {
                dataBackgroundColor: "rgba(181,195,52,0.3)",
                fillerColor: "rgba(181,195,52,0.2)",
                handleColor: "#27727B"
            },
            grid: {
                borderWidth: 0
            },
            categoryAxis: {
                axisLine: {
                    lineStyle: {
                        color: "#27727B"
                    }
                },
                splitLine: {
                    show: !1
                }
            },
            valueAxis: {
                axisLine: {
                    show: !1
                },
                splitArea: {
                    show: !1
                },
                splitLine: {
                    lineStyle: {
                        color: ["#ccc"],
                        type: "dashed"
                    }
                }
            },
            polar: {
                axisLine: {
                    lineStyle: {
                        color: "#ddd"
                    }
                },
                splitArea: {
                    show: !0,
                    areaStyle: {
                        color: ["rgba(250,250,250,0.2)", "rgba(200,200,200,0.2)"]
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "#ddd"
                    }
                }
            },
            timeline: {
                lineStyle: {
                    color: "#27727B"
                },
                controlStyle: {
                    normal: {
                        color: "#27727B"
                    },
                    emphasis: {
                        color: "#27727B"
                    }
                },
                symbol: "emptyCircle",
                symbolSize: 3
            },
            line: {
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        borderColor: "#fff",
                        lineStyle: {
                            width: 3
                        }
                    },
                    emphasis: {
                        borderWidth: 0
                    }
                },
                symbol: "circle",
                symbolSize: 3.5
            },
            k: {
                itemStyle: {
                    normal: {
                        color: "#C1232B",
                        color0: "#B5C334",
                        lineStyle: {
                            width: 1,
                            color: "#C1232B",
                            color0: "#B5C334"
                        }
                    }
                }
            },
            scatter: {
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: "rgba(200,200,200,0.5)"
                    },
                    emphasis: {
                        borderWidth: 0
                    }
                },
                symbol: "star4",
                symbolSize: 4
            },
            radar: {
                symbol: "emptyCircle",
                symbolSize: 3
            },
            map: {
                itemStyle: {
                    normal: {
                        areaStyle: {
                            color: "#ddd"
                        },
                        label: {
                            textStyle: {
                                color: "#C1232B"
                            }
                        }
                    },
                    emphasis: {
                        areaStyle: {
                            color: "#fe994e"
                        },
                        label: {
                            textStyle: {
                                color: "rgb(100,0,0)"
                            }
                        }
                    }
                }
            },
            force: {
                itemStyle: {
                    normal: {
                        linkStyle: {
                            color: "#27727B"
                        }
                    }
                }
            },
            chord: {
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: "rgba(128, 128, 128, 0.5)",
                        chordStyle: {
                            lineStyle: {
                                color: "rgba(128, 128, 128, 0.5)"
                            }
                        }
                    },
                    emphasis: {
                        borderWidth: 1,
                        borderColor: "rgba(128, 128, 128, 0.5)",
                        chordStyle: {
                            lineStyle: {
                                color: "rgba(128, 128, 128, 0.5)"
                            }
                        }
                    }
                }
            },
            gauge: {
                center: ["50%", "80%"],
                radius: "100%",
                startAngle: 180,
                endAngle: 0,
                axisLine: {
                    show: !0,
                    lineStyle: {
                        color: [[.2, "#B5C334"], [.8, "#27727B"], [1, "#C1232B"]],
                        width: "40%"
                    }
                },
                axisTick: {
                    splitNumber: 2,
                    length: 5,
                    lineStyle: {
                        color: "#fff"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontWeight: "bolder"
                    }
                },
                splitLine: {
                    length: "5%",
                    lineStyle: {
                        color: "#fff"
                    }
                },
                pointer: {
                    width: "40%",
                    length: "80%",
                    color: "#fff"
                },
                title: {
                    offsetCenter: [0, -20],
                    textStyle: {
                        color: "auto",
                        fontSize: 20
                    }
                },
                detail: {
                    offsetCenter: [0, 0],
                    textStyle: {
                        color: "auto",
                        fontSize: 40
                    }
                }
            },
            textStyle: {
                fontFamily: "微软雅黑, Arial, Verdana, sans-serif"
            }
        };
        return t
    }),
    i("echarts/util/shape/MarkLine", ["require", "zrender/shape/Base", "./Icon", "zrender/shape/Line", "zrender/shape/BezierCurve", "zrender/tool/area", "zrender/shape/util/dashedLineTo", "zrender/tool/util", "zrender/tool/curve"],
    function(t) {
        function e(t) {
            i.call(this, t),
            this.style.curveness > 0 && this.updatePoints(this.style),
            this.highlightStyle.curveness > 0 && this.updatePoints(this.highlightStyle)
        }
        var i = t("zrender/shape/Base"),
        n = t("./Icon"),
        r = t("zrender/shape/Line"),
        o = new r({}),
        s = t("zrender/shape/BezierCurve"),
        a = new s({}),
        l = t("zrender/tool/area"),
        h = t("zrender/shape/util/dashedLineTo"),
        c = t("zrender/tool/util"),
        d = t("zrender/tool/curve");
        return e.prototype = {
            type: "mark-line",
            brush: function(t, e) {
                var i = this.style;
                e && (i = this.getHighlightStyle(i, this.highlightStyle || {})),
                t.save(),
                this.setContext(t, i),
                this.setTransform(t),
                t.save(),
                t.beginPath(),
                this.buildPath(t, i),
                t.stroke(),
                t.restore(),
                this.brushSymbol(t, i, 0),
                this.brushSymbol(t, i, 1),
                this.drawText(t, i, this.style),
                t.restore()
            },
            buildPath: function(t, e) {
                var i = e.lineType || "solid";
                if (t.moveTo(e.xStart, e.yStart), e.curveness > 0) {
                    var n = null;
                    switch (i) {
                    case "dashed":
                        n = [5, 5];
                        break;
                    case "dotted":
                        n = [1, 1]
                    }
                    n && t.setLineDash && t.setLineDash(n),
                    t.quadraticCurveTo(e.cpX1, e.cpY1, e.xEnd, e.yEnd)
                } else if ("solid" == i) t.lineTo(e.xEnd, e.yEnd);
                else {
                    var r = (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                    h(t, e.xStart, e.yStart, e.xEnd, e.yEnd, r)
                }
            },
            updatePoints: function(t) {
                var e = t.curveness || 0,
                i = 1,
                n = t.xStart,
                r = t.yStart,
                o = t.xEnd,
                s = t.yEnd,
                a = (n + o) / 2 - i * (r - s) * e,
                l = (r + s) / 2 - i * (o - n) * e;
                t.cpX1 = a,
                t.cpY1 = l
            },
            brushSymbol: function(t, e, i) {
                if ("none" != e.symbol[i]) {
                    t.save(),
                    t.beginPath(),
                    t.lineWidth = e.symbolBorder,
                    t.strokeStyle = e.symbolBorderColor;
                    var r = e.symbol[i].replace("empty", "").toLowerCase();
                    e.symbol[i].match("empty") && (t.fillStyle = "#fff");
                    var o = e.xStart,
                    s = e.yStart,
                    a = e.xEnd,
                    l = e.yEnd,
                    h = 0 === i ? o: a,
                    c = 0 === i ? s: l,
                    u = e.curveness || 0,
                    p = null != e.symbolRotate[i] ? e.symbolRotate[i] - 0 : 0;
                    if (p = p / 180 * Math.PI, "arrow" == r && 0 === p) if (0 === u) {
                        var f = 0 === i ? -1 : 1;
                        p = Math.PI / 2 + Math.atan2(f * (l - s), f * (a - o))
                    } else {
                        var g = e.cpX1,
                        m = e.cpY1,
                        _ = d.quadraticDerivativeAt,
                        y = _(o, g, a, i),
                        v = _(s, m, l, i);
                        p = Math.PI / 2 + Math.atan2(v, y)
                    }
                    t.translate(h, c),
                    0 !== p && t.rotate(p);
                    var b = e.symbolSize[i];
                    n.prototype.buildPath(t, {
                        x: -b,
                        y: -b,
                        width: 2 * b,
                        height: 2 * b,
                        iconType: r
                    }),
                    t.closePath(),
                    t.fill(),
                    t.stroke(),
                    t.restore()
                }
            },
            getRect: function(t) {
                return t.curveness > 0 ? a.getRect(t) : o.getRect(t),
                t.__rect
            },
            isCover: function(t, e) {
                var i = this.transformCoordToLocal(t, e);
                return t = i[0],
                e = i[1],
                this.isCoverRect(t, e) ? this.style.curveness > 0 ? l.isInside(a, this.style, t, e) : l.isInside(o, this.style, t, e) : !1
            }
        },
        c.inherits(e, i),
        e
    }),
    i("echarts/util/shape/Icon", ["require", "zrender/tool/util", "zrender/shape/Star", "zrender/shape/Heart", "zrender/shape/Droplet", "zrender/shape/Image", "zrender/shape/Base"],
    function(t) {
        function e(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16,
            o = e.height / 16;
            t.moveTo(i, n + e.height),
            t.lineTo(i + 5 * r, n + 14 * o),
            t.lineTo(i + e.width, n + 3 * o),
            t.lineTo(i + 13 * r, n),
            t.lineTo(i + 2 * r, n + 11 * o),
            t.lineTo(i, n + e.height),
            t.moveTo(i + 6 * r, n + 10 * o),
            t.lineTo(i + 14 * r, n + 2 * o),
            t.moveTo(i + 10 * r, n + 13 * o),
            t.lineTo(i + e.width, n + 13 * o),
            t.moveTo(i + 13 * r, n + 10 * o),
            t.lineTo(i + 13 * r, n + e.height)
        }
        function i(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16,
            o = e.height / 16;
            t.moveTo(i, n + e.height),
            t.lineTo(i + 5 * r, n + 14 * o),
            t.lineTo(i + e.width, n + 3 * o),
            t.lineTo(i + 13 * r, n),
            t.lineTo(i + 2 * r, n + 11 * o),
            t.lineTo(i, n + e.height),
            t.moveTo(i + 6 * r, n + 10 * o),
            t.lineTo(i + 14 * r, n + 2 * o),
            t.moveTo(i + 10 * r, n + 13 * o),
            t.lineTo(i + e.width, n + 13 * o)
        }
        function n(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16,
            o = e.height / 16;
            t.moveTo(i + 4 * r, n + 15 * o),
            t.lineTo(i + 9 * r, n + 13 * o),
            t.lineTo(i + 14 * r, n + 8 * o),
            t.lineTo(i + 11 * r, n + 5 * o),
            t.lineTo(i + 6 * r, n + 10 * o),
            t.lineTo(i + 4 * r, n + 15 * o),
            t.moveTo(i + 5 * r, n),
            t.lineTo(i + 11 * r, n),
            t.moveTo(i + 5 * r, n + o),
            t.lineTo(i + 11 * r, n + o),
            t.moveTo(i, n + 2 * o),
            t.lineTo(i + e.width, n + 2 * o),
            t.moveTo(i, n + 5 * o),
            t.lineTo(i + 3 * r, n + e.height),
            t.lineTo(i + 13 * r, n + e.height),
            t.lineTo(i + e.width, n + 5 * o)
        }
        function r(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16,
            o = e.height / 16;
            t.moveTo(i, n + 3 * o),
            t.lineTo(i + 6 * r, n + 3 * o),
            t.moveTo(i + 3 * r, n),
            t.lineTo(i + 3 * r, n + 6 * o),
            t.moveTo(i + 3 * r, n + 8 * o),
            t.lineTo(i + 3 * r, n + e.height),
            t.lineTo(i + e.width, n + e.height),
            t.lineTo(i + e.width, n + 3 * o),
            t.lineTo(i + 8 * r, n + 3 * o)
        }
        function o(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16,
            o = e.height / 16;
            t.moveTo(i + 6 * r, n),
            t.lineTo(i + 2 * r, n + 3 * o),
            t.lineTo(i + 6 * r, n + 6 * o),
            t.moveTo(i + 2 * r, n + 3 * o),
            t.lineTo(i + 14 * r, n + 3 * o),
            t.lineTo(i + 14 * r, n + 11 * o),
            t.moveTo(i + 2 * r, n + 5 * o),
            t.lineTo(i + 2 * r, n + 13 * o),
            t.lineTo(i + 14 * r, n + 13 * o),
            t.moveTo(i + 10 * r, n + 10 * o),
            t.lineTo(i + 14 * r, n + 13 * o),
            t.lineTo(i + 10 * r, n + e.height)
        }
        function s(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16,
            o = e.height / 16,
            s = e.width / 2;
            t.lineWidth = 1.5,
            t.arc(i + s, n + s, s - r, 0, 2 * Math.PI / 3),
            t.moveTo(i + 3 * r, n + e.height),
            t.lineTo(i + 0 * r, n + 12 * o),
            t.lineTo(i + 5 * r, n + 11 * o),
            t.moveTo(i, n + 8 * o),
            t.arc(i + s, n + s, s - r, Math.PI, 5 * Math.PI / 3),
            t.moveTo(i + 13 * r, n),
            t.lineTo(i + e.width, n + 4 * o),
            t.lineTo(i + 11 * r, n + 5 * o)
        }
        function a(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16,
            o = e.height / 16;
            t.moveTo(i, n),
            t.lineTo(i, n + e.height),
            t.lineTo(i + e.width, n + e.height),
            t.moveTo(i + 2 * r, n + 14 * o),
            t.lineTo(i + 7 * r, n + 6 * o),
            t.lineTo(i + 11 * r, n + 11 * o),
            t.lineTo(i + 15 * r, n + 2 * o)
        }
        function l(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16,
            o = e.height / 16;
            t.moveTo(i, n),
            t.lineTo(i, n + e.height),
            t.lineTo(i + e.width, n + e.height),
            t.moveTo(i + 3 * r, n + 14 * o),
            t.lineTo(i + 3 * r, n + 6 * o),
            t.lineTo(i + 4 * r, n + 6 * o),
            t.lineTo(i + 4 * r, n + 14 * o),
            t.moveTo(i + 7 * r, n + 14 * o),
            t.lineTo(i + 7 * r, n + 2 * o),
            t.lineTo(i + 8 * r, n + 2 * o),
            t.lineTo(i + 8 * r, n + 14 * o),
            t.moveTo(i + 11 * r, n + 14 * o),
            t.lineTo(i + 11 * r, n + 9 * o),
            t.lineTo(i + 12 * r, n + 9 * o),
            t.lineTo(i + 12 * r, n + 14 * o)
        }
        function h(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width - 2,
            o = e.height - 2,
            s = Math.min(r, o) / 2;
            n += 2,
            t.moveTo(i + s + 3, n + s - 3),
            t.arc(i + s + 3, n + s - 3, s - 1, 0, -Math.PI / 2, !0),
            t.lineTo(i + s + 3, n + s - 3),
            t.moveTo(i + s, n),
            t.lineTo(i + s, n + s),
            t.arc(i + s, n + s, s, -Math.PI / 2, 2 * Math.PI, !0),
            t.lineTo(i + s, n + s),
            t.lineWidth = 1.5
        }
        function c(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16,
            o = e.height / 16;
            n -= o,
            t.moveTo(i + 1 * r, n + 2 * o),
            t.lineTo(i + 15 * r, n + 2 * o),
            t.lineTo(i + 14 * r, n + 3 * o),
            t.lineTo(i + 2 * r, n + 3 * o),
            t.moveTo(i + 3 * r, n + 6 * o),
            t.lineTo(i + 13 * r, n + 6 * o),
            t.lineTo(i + 12 * r, n + 7 * o),
            t.lineTo(i + 4 * r, n + 7 * o),
            t.moveTo(i + 5 * r, n + 10 * o),
            t.lineTo(i + 11 * r, n + 10 * o),
            t.lineTo(i + 10 * r, n + 11 * o),
            t.lineTo(i + 6 * r, n + 11 * o),
            t.moveTo(i + 7 * r, n + 14 * o),
            t.lineTo(i + 9 * r, n + 14 * o),
            t.lineTo(i + 8 * r, n + 15 * o),
            t.lineTo(i + 7 * r, n + 15 * o)
        }
        function d(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width,
            o = e.height,
            s = r / 16,
            a = o / 16,
            l = 2 * Math.min(s, a);
            t.moveTo(i + s + l, n + a + l),
            t.arc(i + s, n + a, l, Math.PI / 4, 3 * Math.PI),
            t.lineTo(i + 7 * s - l, n + 6 * a - l),
            t.arc(i + 7 * s, n + 6 * a, l, Math.PI / 4 * 5, 4 * Math.PI),
            t.arc(i + 7 * s, n + 6 * a, l / 2, Math.PI / 4 * 5, 4 * Math.PI),
            t.moveTo(i + 7 * s - l / 2, n + 6 * a + l),
            t.lineTo(i + s + l, n + 14 * a - l),
            t.arc(i + s, n + 14 * a, l, -Math.PI / 4, 2 * Math.PI),
            t.moveTo(i + 7 * s + l / 2, n + 6 * a),
            t.lineTo(i + 14 * s - l, n + 10 * a - l / 2),
            t.moveTo(i + 16 * s, n + 10 * a),
            t.arc(i + 14 * s, n + 10 * a, l, 0, 3 * Math.PI),
            t.lineWidth = 1.5
        }
        function u(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width,
            o = e.height,
            s = Math.min(r, o) / 2;
            t.moveTo(i + r, n + o / 2),
            t.arc(i + s, n + s, s, 0, 2 * Math.PI),
            t.arc(i + s, n, s, Math.PI / 4, Math.PI / 5 * 4),
            t.arc(i, n + s, s, -Math.PI / 3, Math.PI / 3),
            t.arc(i + r, n + o, s, Math.PI, Math.PI / 2 * 3),
            t.lineWidth = 1.5
        }
        function p(t, e) {
            for (var i = e.x,
            n = e.y,
            r = e.width,
            o = e.height,
            s = Math.round(o / 3), a = Math.round((s - 2) / 2), l = 3; l--;) t.rect(i, n + s * l + a, r, 2)
        }
        function f(t, e) {
            for (var i = e.x,
            n = e.y,
            r = e.width,
            o = e.height,
            s = Math.round(r / 3), a = Math.round((s - 2) / 2), l = 3; l--;) t.rect(i + s * l + a, n, 2, o)
        }
        function g(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16;
            t.moveTo(i + r, n),
            t.lineTo(i + r, n + e.height),
            t.lineTo(i + 15 * r, n + e.height),
            t.lineTo(i + 15 * r, n),
            t.lineTo(i + r, n),
            t.moveTo(i + 3 * r, n + 3 * r),
            t.lineTo(i + 13 * r, n + 3 * r),
            t.moveTo(i + 3 * r, n + 6 * r),
            t.lineTo(i + 13 * r, n + 6 * r),
            t.moveTo(i + 3 * r, n + 9 * r),
            t.lineTo(i + 13 * r, n + 9 * r),
            t.moveTo(i + 3 * r, n + 12 * r),
            t.lineTo(i + 9 * r, n + 12 * r)
        }
        function m(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16,
            o = e.height / 16;
            t.moveTo(i, n),
            t.lineTo(i, n + e.height),
            t.lineTo(i + e.width, n + e.height),
            t.lineTo(i + e.width, n),
            t.lineTo(i, n),
            t.moveTo(i + 4 * r, n),
            t.lineTo(i + 4 * r, n + 8 * o),
            t.lineTo(i + 12 * r, n + 8 * o),
            t.lineTo(i + 12 * r, n),
            t.moveTo(i + 6 * r, n + 11 * o),
            t.lineTo(i + 6 * r, n + 13 * o),
            t.lineTo(i + 10 * r, n + 13 * o),
            t.lineTo(i + 10 * r, n + 11 * o),
            t.lineTo(i + 6 * r, n + 11 * o)
        }
        function _(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width,
            o = e.height;
            t.moveTo(i, n + o / 2),
            t.lineTo(i + r, n + o / 2),
            t.moveTo(i + r / 2, n),
            t.lineTo(i + r / 2, n + o)
        }
        function y(t, e) {
            var i = e.width / 2,
            n = e.height / 2,
            r = Math.min(i, n);
            t.moveTo(e.x + i + r, e.y + n),
            t.arc(e.x + i, e.y + n, r, 0, 2 * Math.PI),
            t.closePath()
        }
        function v(t, e) {
            t.rect(e.x, e.y, e.width, e.height),
            t.closePath()
        }
        function b(t, e) {
            var i = e.width / 2,
            n = e.height / 2,
            r = e.x + i,
            o = e.y + n,
            s = Math.min(i, n);
            t.moveTo(r, o - s),
            t.lineTo(r + s, o + s),
            t.lineTo(r - s, o + s),
            t.lineTo(r, o - s),
            t.closePath()
        }
        function x(t, e) {
            var i = e.width / 2,
            n = e.height / 2,
            r = e.x + i,
            o = e.y + n,
            s = Math.min(i, n);
            t.moveTo(r, o - s),
            t.lineTo(r + s, o),
            t.lineTo(r, o + s),
            t.lineTo(r - s, o),
            t.lineTo(r, o - s),
            t.closePath()
        }
        function T(t, e) {
            var i = e.x,
            n = e.y,
            r = e.width / 16;
            t.moveTo(i + 8 * r, n),
            t.lineTo(i + r, n + e.height),
            t.lineTo(i + 8 * r, n + e.height / 4 * 3),
            t.lineTo(i + 15 * r, n + e.height),
            t.lineTo(i + 8 * r, n),
            t.closePath()
        }
        function w(e, i) {
            var n = t("zrender/shape/Star"),
            r = i.width / 2,
            o = i.height / 2;
            n.prototype.buildPath(e, {
                x: i.x + r,
                y: i.y + o,
                r: Math.min(r, o),
                n: i.n || 5
            })
        }
        function S(e, i) {
            var n = t("zrender/shape/Heart");
            n.prototype.buildPath(e, {
                x: i.x + i.width / 2,
                y: i.y + .2 * i.height,
                a: i.width / 2,
                b: .8 * i.height
            })
        }
        function C(e, i) {
            var n = t("zrender/shape/Droplet");
            n.prototype.buildPath(e, {
                x: i.x + .5 * i.width,
                y: i.y + .5 * i.height,
                a: .5 * i.width,
                b: .8 * i.height
            })
        }
        function k(t, e) {
            var i = e.x,
            n = e.y - e.height / 2 * 1.5,
            r = e.width / 2,
            o = e.height / 2,
            s = Math.min(r, o);
            t.arc(i + r, n + o, s, Math.PI / 5 * 4, Math.PI / 5),
            t.lineTo(i + r, n + o + 1.5 * s),
            t.closePath()
        }
        function E(e, i, n) {
            var r = t("zrender/shape/Image");
            this._imageShape = this._imageShape || new r({
                style: {}
            });
            for (var o in i) this._imageShape.style[o] = i[o];
            this._imageShape.brush(e, !1, n)
        }
        function z(t) {
            M.call(this, t)
        }
        var L = t("zrender/tool/util"),
        M = t("zrender/shape/Base");
        return z.prototype = {
            type: "icon",
            iconLibrary: {
                mark: e,
                markUndo: i,
                markClear: n,
                dataZoom: r,
                dataZoomReset: o,
                restore: s,
                lineChart: a,
                barChart: l,
                pieChart: h,
                funnelChart: c,
                forceChart: d,
                chordChart: u,
                stackChart: p,
                tiledChart: f,
                dataView: g,
                saveAsImage: m,
                cross: _,
                circle: y,
                rectangle: v,
                triangle: b,
                diamond: x,
                arrow: T,
                star: w,
                heart: S,
                droplet: C,
                pin: k,
                image: E
            },
            brush: function(e, i, n) {
                var r = i ? this.highlightStyle: this.style;
                r = r || {};
                var o = r.iconType || this.style.iconType;
                if ("image" === o) {
                    var s = t("zrender/shape/Image");
                    s.prototype.brush.call(this, e, i, n)
                } else {
                    var r = this.beforeBrush(e, i);
                    switch (e.beginPath(), this.buildPath(e, r, n), r.brushType) {
                    case "both":
                        e.fill();
                    case "stroke":
                        r.lineWidth > 0 && e.stroke();
                        break;
                    default:
                        e.fill()
                    }
                    this.drawText(e, r, this.style),
                    this.afterBrush(e)
                }
            },
            buildPath: function(t, e, i) {
                this.iconLibrary[e.iconType] ? this.iconLibrary[e.iconType].call(this, t, e, i) : (t.moveTo(e.x, e.y), t.lineTo(e.x + e.width, e.y), t.lineTo(e.x + e.width, e.y + e.height), t.lineTo(e.x, e.y + e.height), t.lineTo(e.x, e.y), t.closePath())
            },
            getRect: function(t) {
                return t.__rect ? t.__rect: (t.__rect = {
                    x: Math.round(t.x),
                    y: Math.round(t.y - ("pin" == t.iconType ? t.height / 2 * 1.5 : 0)),
                    width: t.width,
                    height: t.height * ("pin" === t.iconType ? 1.25 : 1)
                },
                t.__rect)
            },
            isCover: function(t, e) {
                var i = this.transformCoordToLocal(t, e);
                t = i[0],
                e = i[1];
                var n = this.style.__rect;
                n || (n = this.style.__rect = this.getRect(this.style));
                var r = n.height < 8 || n.width < 8 ? 4 : 0;
                return t >= n.x - r && t <= n.x + n.width + r && e >= n.y - r && e <= n.y + n.height + r
            }
        },
        L.inherits(z, M),
        z
    }),
    i("echarts/util/shape/Symbol", ["require", "zrender/shape/Base", "zrender/shape/Polygon", "zrender/tool/util", "./normalIsCover"],
    function(t) {
        function e(t) {
            i.call(this, t)
        }
        var i = t("zrender/shape/Base"),
        n = t("zrender/shape/Polygon"),
        r = new n({}),
        o = t("zrender/tool/util");
        return e.prototype = {
            type: "symbol",
            buildPath: function(t, e) {
                var i = e.pointList,
                n = i.length;
                if (0 !== n) for (var r, o, s, a, l, h = 1e4,
                c = Math.ceil(n / h), d = i[0] instanceof Array, u = e.size ? e.size: 2, p = u, f = u / 2, g = 2 * Math.PI, m = 0; c > m; m++) {
                    t.beginPath(),
                    r = m * h,
                    o = r + h,
                    o = o > n ? n: o;
                    for (var _ = r; o > _; _++) if (e.random && (s = e["randomMap" + _ % 20] / 100, p = u * s * s, f = p / 2), d ? (a = i[_][0], l = i[_][1]) : (a = i[_].x, l = i[_].y), 3 > p) t.rect(a - f, l - f, p, p);
                    else switch (e.iconType) {
                    case "circle":
                        t.moveTo(a, l),
                        t.arc(a, l, f, 0, g, !0);
                        break;
                    case "diamond":
                        t.moveTo(a, l - f),
                        t.lineTo(a + f / 3, l - f / 3),
                        t.lineTo(a + f, l),
                        t.lineTo(a + f / 3, l + f / 3),
                        t.lineTo(a, l + f),
                        t.lineTo(a - f / 3, l + f / 3),
                        t.lineTo(a - f, l),
                        t.lineTo(a - f / 3, l - f / 3),
                        t.lineTo(a, l - f);
                        break;
                    default:
                        t.rect(a - f, l - f, p, p)
                    }
                    if (t.closePath(), c - 1 > m) switch (e.brushType) {
                    case "both":
                        t.fill(),
                        e.lineWidth > 0 && t.stroke();
                        break;
                    case "stroke":
                        e.lineWidth > 0 && t.stroke();
                        break;
                    default:
                        t.fill()
                    }
                }
            },
            getRect: function(t) {
                return t.__rect || r.getRect(t)
            },
            isCover: t("./normalIsCover")
        },
        o.inherits(e, i),
        e
    }),
    i("zrender/shape/ShapeBundle", ["require", "./Base", "../tool/util"],
    function(t) {
        var e = t("./Base"),
        i = function(t) {
            e.call(this, t)
        };
        return i.prototype = {
            constructor: i,
            type: "shape-bundle",
            brush: function(t, e) {
                var i = this.beforeBrush(t, e);
                t.beginPath();
                for (var n = 0; n < i.shapeList.length; n++) {
                    var r = i.shapeList[n],
                    o = r.style;
                    e && (o = r.getHighlightStyle(o, r.highlightStyle || {},
                    r.brushTypeOnly)),
                    r.buildPath(t, o)
                }
                switch (i.brushType) {
                case "both":
                    t.fill();
                case "stroke":
                    i.lineWidth > 0 && t.stroke();
                    break;
                default:
                    t.fill()
                }
                this.drawText(t, i, this.style),
                this.afterBrush(t)
            },
            getRect: function(t) {
                if (t.__rect) return t.__rect;
                for (var e = 1 / 0,
                i = -1 / 0,
                n = 1 / 0,
                r = -1 / 0,
                o = 0; o < t.shapeList.length; o++) var s = t.shapeList[o],
                a = s.getRect(s.style),
                e = Math.min(a.x, e),
                n = Math.min(a.y, n),
                i = Math.max(a.x + a.width, i),
                r = Math.max(a.y + a.height, r);
                return t.__rect = {
                    x: e,
                    y: n,
                    width: i - e,
                    height: r - n
                },
                t.__rect
            },
            isCover: function(t, e) {
                var i = this.transformCoordToLocal(t, e);
                if (t = i[0], e = i[1], this.isCoverRect(t, e)) for (var n = 0; n < this.style.shapeList.length; n++) {
                    var r = this.style.shapeList[n];
                    if (r.isCover(t, e)) return ! 0
                }
                return ! 1
            }
        },
        t("../tool/util").inherits(i, e),
        i
    }),
    i("echarts/util/ecEffect", ["require", "../util/ecData", "zrender/shape/Circle", "zrender/shape/Image", "zrender/tool/curve", "../util/shape/Icon", "../util/shape/Symbol", "zrender/shape/ShapeBundle", "zrender/shape/Polyline", "zrender/tool/vector", "zrender/tool/env"],
    function(t) {
        function e(t, e, i, n) {
            var r, s = i.effect,
            l = s.color || i.style.strokeColor || i.style.color,
            c = s.shadowColor || l,
            d = s.scaleSize,
            u = s.bounceDistance,
            p = "undefined" != typeof s.shadowBlur ? s.shadowBlur: d;
            "image" !== i.type ? (r = new h({
                zlevel: n,
                style: {
                    brushType: "stroke",
                    iconType: "droplet" != i.style.iconType ? i.style.iconType: "circle",
                    x: p + 1,
                    y: p + 1,
                    n: i.style.n,
                    width: i.style._width * d,
                    height: i.style._height * d,
                    lineWidth: 1,
                    strokeColor: l,
                    shadowColor: c,
                    shadowBlur: p
                },
                draggable: !1,
                hoverable: !1
            }), "pin" == i.style.iconType && (r.style.y += r.style.height / 2 * 1.5), f && (r.style.image = t.shapeToImage(r, r.style.width + 2 * p + 2, r.style.height + 2 * p + 2).style.image, r = new a({
                zlevel: r.zlevel,
                style: r.style,
                draggable: !1,
                hoverable: !1
            }))) : r = new a({
                zlevel: n,
                style: i.style,
                draggable: !1,
                hoverable: !1
            }),
            o.clone(i, r),
            r.position = i.position,
            e.push(r),
            t.addShape(r);
            var g = "image" !== i.type ? window.devicePixelRatio || 1 : 1,
            m = (r.style.width / g - i.style._width) / 2;
            r.style.x = i.style._x - m,
            r.style.y = i.style._y - m,
            "pin" == i.style.iconType && (r.style.y -= i.style.height / 2 * 1.5);
            var _ = 100 * (s.period + 10 * Math.random());
            t.modShape(i.id, {
                invisible: !0
            });
            var y = r.style.x + r.style.width / 2 / g,
            v = r.style.y + r.style.height / 2 / g;
            "scale" === s.type ? (t.modShape(r.id, {
                scale: [.1, .1, y, v]
            }), t.animate(r.id, "", s.loop).when(_, {
                scale: [1, 1, y, v]
            }).done(function() {
                i.effect.show = !1,
                t.delShape(r.id)
            }).start()) : t.animate(r.id, "style", s.loop).when(_, {
                y: r.style.y - u
            }).when(2 * _, {
                y: r.style.y
            }).done(function() {
                i.effect.show = !1,
                t.delShape(r.id)
            }).start()
        }
        function i(t, e, i, n) {
            var r = i.effect,
            o = r.color || i.style.strokeColor || i.style.color,
            s = r.scaleSize,
            a = r.shadowColor || o,
            l = "undefined" != typeof r.shadowBlur ? r.shadowBlur: 2 * s,
            h = window.devicePixelRatio || 1,
            d = new c({
                zlevel: n,
                position: i.position,
                scale: i.scale,
                style: {
                    pointList: i.style.pointList,
                    iconType: i.style.iconType,
                    color: o,
                    strokeColor: o,
                    shadowColor: a,
                    shadowBlur: l * h,
                    random: !0,
                    brushType: "fill",
                    lineWidth: 1,
                    size: i.style.size
                },
                draggable: !1,
                hoverable: !1
            });
            e.push(d),
            t.addShape(d),
            t.modShape(i.id, {
                invisible: !0
            });
            for (var u = Math.round(100 * r.period), p = {},
            f = {},
            g = 0; 20 > g; g++) d.style["randomMap" + g] = 0,
            p = {},
            p["randomMap" + g] = 100,
            f = {},
            f["randomMap" + g] = 0,
            d.style["randomMap" + g] = 100 * Math.random(),
            t.animate(d.id, "style", !0).when(u, p).when(2 * u, f).when(3 * u, p).when(4 * u, p).delay(Math.random() * u * g).start()
        }
        function n(t, e, i, n, r) {
            var a = i.effect,
            h = i.style,
            c = a.color || h.strokeColor || h.color,
            d = a.shadowColor || h.strokeColor || c,
            g = h.lineWidth * a.scaleSize,
            m = "undefined" != typeof a.shadowBlur ? a.shadowBlur: g,
            _ = new s({
                zlevel: n,
                style: {
                    x: m,
                    y: m,
                    r: g,
                    color: c,
                    shadowColor: d,
                    shadowBlur: m
                },
                hoverable: !1
            }),
            y = 0;
            if (f && !r) {
                var n = _.zlevel;
                _ = t.shapeToImage(_, 2 * (g + m), 2 * (g + m)),
                _.zlevel = n,
                _.hoverable = !1,
                y = m
            }
            r || (o.clone(i, _), _.position = i.position, e.push(_), t.addShape(_));
            var v = function() {
                r || (i.effect.show = !1, t.delShape(_.id)),
                _.effectAnimator = null
            };
            if (i instanceof u) {
                for (var b = [0], x = 0, T = h.pointList, w = h.controlPointList, S = 1; S < T.length; S++) {
                    if (w) {
                        var C = w[2 * (S - 1)],
                        k = w[2 * (S - 1) + 1];
                        x += p.dist(T[S - 1], C) + p.dist(C, k) + p.dist(k, T[S])
                    } else x += p.dist(T[S - 1], T[S]);
                    b.push(x)
                }
                for (var E = {
                    p: 0
                },
                z = t.animation.animate(E, {
                    loop: a.loop
                }), S = 0; S < b.length; S++) z.when(b[S] * a.period, {
                    p: S
                });
                z.during(function() {
                    var e, i, n = Math.floor(E.p);
                    if (n == T.length - 1) e = T[n][0],
                    i = T[n][1];
                    else {
                        var o = E.p - n,
                        s = T[n],
                        a = T[n + 1];
                        if (w) {
                            var h = w[2 * n],
                            c = w[2 * n + 1];
                            e = l.cubicAt(s[0], h[0], c[0], a[0], o),
                            i = l.cubicAt(s[1], h[1], c[1], a[1], o)
                        } else e = (a[0] - s[0]) * o + s[0],
                        i = (a[1] - s[1]) * o + s[1]
                    }
                    _.style.x = e,
                    _.style.y = i,
                    r || t.modShape(_)
                }).done(v).start(),
                z.duration = x * a.period,
                _.effectAnimator = z
            } else {
                var L = h.xStart - y,
                M = h.yStart - y,
                A = h.xEnd - y,
                P = h.yEnd - y;
                _.style.x = L,
                _.style.y = M;
                var I = (A - L) * (A - L) + (P - M) * (P - M),
                R = Math.round(Math.sqrt(Math.round(I * a.period * a.period)));
                if (i.style.curveness > 0) {
                    var O = h.cpX1 - y,
                    D = h.cpY1 - y;
                    _.effectAnimator = t.animation.animate(_, {
                        loop: a.loop
                    }).when(R, {
                        p: 1
                    }).during(function(e, i) {
                        _.style.x = l.quadraticAt(L, O, A, i),
                        _.style.y = l.quadraticAt(M, D, P, i),
                        r || t.modShape(_)
                    }).done(v).start()
                } else _.effectAnimator = t.animation.animate(_.style, {
                    loop: a.loop
                }).when(R, {
                    x: A,
                    y: P
                }).during(function() {
                    r || t.modShape(_)
                }).done(v).start();
                _.effectAnimator.duration = R
            }
            return _
        }
        function r(t, e, i, r) {
            var o = new d({
                style: {
                    shapeList: []
                },
                zlevel: r,
                hoverable: !1
            }),
            s = i.style.shapeList,
            a = i.effect;
            o.position = i.position;
            for (var l = 0,
            h = [], c = 0; c < s.length; c++) {
                s[c].effect = a;
                var u = n(t, null, s[c], r, !0),
                p = u.effectAnimator;
                o.style.shapeList.push(u),
                p.duration > l && (l = p.duration),
                0 === c && (o.style.color = u.style.color, o.style.shadowBlur = u.style.shadowBlur, o.style.shadowColor = u.style.shadowColor),
                h.push(p)
            }
            e.push(o),
            t.addShape(o);
            var f = function() {
                for (var t = 0; t < h.length; t++) h[t].stop()
            };
            if (l) {
                o.__dummy = 0;
                var g = t.animate(o.id, "", a.loop).when(l, {
                    __dummy: 1
                }).during(function() {
                    t.modShape(o)
                }).done(function() {
                    i.effect.show = !1,
                    t.delShape(o.id)
                }).start(),
                m = g.stop;
                g.stop = function() {
                    f(),
                    m.call(this)
                }
            }
        }
        var o = t("../util/ecData"),
        s = t("zrender/shape/Circle"),
        a = t("zrender/shape/Image"),
        l = t("zrender/tool/curve"),
        h = t("../util/shape/Icon"),
        c = t("../util/shape/Symbol"),
        d = t("zrender/shape/ShapeBundle"),
        u = t("zrender/shape/Polyline"),
        p = t("zrender/tool/vector"),
        f = t("zrender/tool/env").canvasSupported;
        return {
            point: e,
            largePoint: i,
            line: n,
            largeLine: r
        }
    }),
    i("echarts/util/ecAnimation", ["require", "zrender/tool/util", "zrender/tool/curve", "zrender/shape/Polygon"],
    function(t) {
        function e(t, e, i, n, r) {
            var o, s = i.style.pointList,
            a = s.length;
            if (!e) {
                if (o = [], "vertical" != i._orient) for (var l = s[0][1], h = 0; a > h; h++) o[h] = [s[h][0], l];
                else for (var c = s[0][0], h = 0; a > h; h++) o[h] = [c, s[h][1]];
                "half-smooth-polygon" == i.type && (o[a - 1] = f.clone(s[a - 1]), o[a - 2] = f.clone(s[a - 2])),
                e = {
                    style: {
                        pointList: o
                    }
                }
            }
            o = e.style.pointList;
            var d = o.length;
            i.style.pointList = d == a ? o: a > d ? o.concat(s.slice(d)) : o.slice(0, a),
            t.addShape(i),
            i.__animating = !0,
            t.animate(i.id, "style").when(n, {
                pointList: s
            }).during(function() {
                i.updateControlPoints && i.updateControlPoints(i.style)
            }).done(function() {
                i.__animating = !1
            }).start(r)
        }
        function i(t, e) {
            for (var i = arguments.length,
            n = 2; i > n; n++) {
                var r = arguments[n];
                t.style[r] = e.style[r]
            }
        }
        function n(t, e, n, r, o) {
            var s = n.style;
            e || (e = {
                position: n.position,
                style: {
                    x: s.x,
                    y: "vertical" == n._orient ? s.y + s.height: s.y,
                    width: "vertical" == n._orient ? s.width: 0,
                    height: "vertical" != n._orient ? s.height: 0
                }
            });
            var a = s.x,
            l = s.y,
            h = s.width,
            c = s.height,
            d = [n.position[0], n.position[1]];
            i(n, e, "x", "y", "width", "height"),
            n.position = e.position,
            t.addShape(n),
            (d[0] != e.position[0] || d[1] != e.position[1]) && t.animate(n.id, "").when(r, {
                position: d
            }).start(o),
            n.__animating = !0,
            t.animate(n.id, "style").when(r, {
                x: a,
                y: l,
                width: h,
                height: c
            }).done(function() {
                n.__animating = !1
            }).start(o)
        }
        function r(t, e, i, n, r) {
            if (!e) {
                var o = i.style.y;
                e = {
                    style: {
                        y: [o[0], o[0], o[0], o[0]]
                    }
                }
            }
            var s = i.style.y;
            i.style.y = e.style.y,
            t.addShape(i),
            i.__animating = !0,
            t.animate(i.id, "style").when(n, {
                y: s
            }).done(function() {
                i.__animating = !1
            }).start(r)
        }
        function o(t, e, i, n, r) {
            var o = i.style.x,
            s = i.style.y,
            a = i.style.r0,
            l = i.style.r;
            i.__animating = !0,
            "r" != i._animationAdd ? (i.style.r0 = 0, i.style.r = 0, i.rotation = [2 * Math.PI, o, s], t.addShape(i), t.animate(i.id, "style").when(n, {
                r0: a,
                r: l
            }).done(function() {
                i.__animating = !1
            }).start(r), t.animate(i.id, "").when(n, {
                rotation: [0, o, s]
            }).start(r)) : (i.style.r0 = i.style.r, t.addShape(i), t.animate(i.id, "style").when(n, {
                r0: a
            }).done(function() {
                i.__animating = !1
            }).start(r))
        }
        function s(t, e, n, r, o) {
            e || (e = "r" != n._animationAdd ? {
                style: {
                    startAngle: n.style.startAngle,
                    endAngle: n.style.startAngle
                }
            }: {
                style: {
                    r0: n.style.r
                }
            });
            var s = n.style.startAngle,
            a = n.style.endAngle;
            i(n, e, "startAngle", "endAngle"),
            t.addShape(n),
            n.__animating = !0,
            t.animate(n.id, "style").when(r, {
                startAngle: s,
                endAngle: a
            }).done(function() {
                n.__animating = !1
            }).start(o)
        }
        function a(t, e, n, r, o) {
            e || (e = {
                style: {
                    x: "left" == n.style.textAlign ? n.style.x + 100 : n.style.x - 100,
                    y: n.style.y
                }
            });
            var s = n.style.x,
            a = n.style.y;
            i(n, e, "x", "y"),
            t.addShape(n),
            n.__animating = !0,
            t.animate(n.id, "style").when(r, {
                x: s,
                y: a
            }).done(function() {
                n.__animating = !1
            }).start(o)
        }
        function l(e, i, n, r, o) {
            var s = t("zrender/shape/Polygon").prototype.getRect(n.style),
            a = s.x + s.width / 2,
            l = s.y + s.height / 2;
            n.scale = [.1, .1, a, l],
            e.addShape(n),
            n.__animating = !0,
            e.animate(n.id, "").when(r, {
                scale: [1, 1, a, l]
            }).done(function() {
                n.__animating = !1
            }).start(o)
        }
        function h(t, e, n, r, o) {
            e || (e = {
                style: {
                    source0: 0,
                    source1: n.style.source1 > 0 ? 360 : -360,
                    target0: 0,
                    target1: n.style.target1 > 0 ? 360 : -360
                }
            });
            var s = n.style.source0,
            a = n.style.source1,
            l = n.style.target0,
            h = n.style.target1;
            e.style && i(n, e, "source0", "source1", "target0", "target1"),
            t.addShape(n),
            n.__animating = !0,
            t.animate(n.id, "style").when(r, {
                source0: s,
                source1: a,
                target0: l,
                target1: h
            }).done(function() {
                n.__animating = !1
            }).start(o)
        }
        function c(t, e, i, n, r) {
            e || (e = {
                style: {
                    angle: i.style.startAngle
                }
            });
            var o = i.style.angle;
            i.style.angle = e.style.angle,
            t.addShape(i),
            i.__animating = !0,
            t.animate(i.id, "style").when(n, {
                angle: o
            }).done(function() {
                i.__animating = !1
            }).start(r)
        }
        function d(t, e, i, r, o, s) {
            if (i.style._x = i.style.x, i.style._y = i.style.y, i.style._width = i.style.width, i.style._height = i.style.height, e) n(t, e, i, r, o);
            else {
                var a = i._x || 0,
                l = i._y || 0;
                i.scale = [.01, .01, a, l],
                t.addShape(i),
                i.__animating = !0,
                t.animate(i.id, "").delay(s).when(r, {
                    scale: [1, 1, a, l]
                }).done(function() {
                    i.__animating = !1
                }).start(o || "QuinticOut")
            }
        }
        function u(t, e, n, r, o) {
            e || (e = {
                style: {
                    xStart: n.style.xStart,
                    yStart: n.style.yStart,
                    xEnd: n.style.xStart,
                    yEnd: n.style.yStart
                }
            });
            var s = n.style.xStart,
            a = n.style.xEnd,
            l = n.style.yStart,
            h = n.style.yEnd;
            i(n, e, "xStart", "xEnd", "yStart", "yEnd"),
            t.addShape(n),
            n.__animating = !0,
            t.animate(n.id, "style").when(r, {
                xStart: s,
                xEnd: a,
                yStart: l,
                yEnd: h
            }).done(function() {
                n.__animating = !1
            }).start(o)
        }
        function p(t, e, i, n, r) {
            r = r || "QuinticOut",
            i.__animating = !0,
            t.addShape(i);
            var o = i.style,
            s = function() {
                i.__animating = !1
            },
            a = o.xStart,
            l = o.yStart,
            h = o.xEnd,
            c = o.yEnd;
            if (o.curveness > 0) {
                i.updatePoints(o);
                var d = {
                    p: 0
                },
                u = o.cpX1,
                p = o.cpY1,
                f = [],
                m = [],
                _ = g.quadraticSubdivide;
                t.animation.animate(d).when(n, {
                    p: 1
                }).during(function() {
                    _(a, u, h, d.p, f),
                    _(l, p, c, d.p, m),
                    o.cpX1 = f[1],
                    o.cpY1 = m[1],
                    o.xEnd = f[2],
                    o.yEnd = m[2],
                    t.modShape(i)
                }).done(s).start(r)
            } else t.animate(i.id, "style").when(0, {
                xEnd: a,
                yEnd: l
            }).when(n, {
                xEnd: h,
                yEnd: c
            }).done(s).start(r)
        }
        var f = t("zrender/tool/util"),
        g = t("zrender/tool/curve");
        return {
            pointList: e,
            rectangle: n,
            candle: r,
            ring: o,
            sector: s,
            text: a,
            polygon: l,
            ribbon: h,
            gaugePointer: c,
            icon: d,
            line: u,
            markline: p
        }
    }),
    i("echarts/util/accMath", [],
    function() {
        function t(t, e) {
            var i = t.toString(),
            n = e.toString(),
            r = 0;
            try {
                r = n.split(".")[1].length
            } catch(o) {}
            try {
                r -= i.split(".")[1].length
            } catch(o) {}
            return (i.replace(".", "") - 0) / (n.replace(".", "") - 0) * Math.pow(10, r)
        }
        function e(t, e) {
            var i = t.toString(),
            n = e.toString(),
            r = 0;
            try {
                r += i.split(".")[1].length
            } catch(o) {}
            try {
                r += n.split(".")[1].length
            } catch(o) {}
            return (i.replace(".", "") - 0) * (n.replace(".", "") - 0) / Math.pow(10, r)
        }
        function i(t, e) {
            var i = 0,
            n = 0;
            try {
                i = t.toString().split(".")[1].length
            } catch(r) {}
            try {
                n = e.toString().split(".")[1].length
            } catch(r) {}
            var o = Math.pow(10, Math.max(i, n));
            return (Math.round(t * o) + Math.round(e * o)) / o
        }
        function n(t, e) {
            return i(t, -e)
        }
        return {
            accDiv: t,
            accMul: e,
            accAdd: i,
            accSub: n
        }
    }),
    i("echarts/component/base", ["require", "../config", "../util/ecData", "../util/ecQuery", "../util/number", "zrender/tool/util", "zrender/tool/env"],
    function(t) {
        function e(t, e, r, o, s) {
            this.ecTheme = t,
            this.messageCenter = e,
            this.zr = r,
            this.option = o,
            this.series = o.series,
            this.myChart = s,
            this.component = s.component,
            this.shapeList = [],
            this.effectList = [];
            var a = this;
            a._onlegendhoverlink = function(t) {
                if (a.legendHoverLink) for (var e, r = t.target,
                o = a.shapeList.length - 1; o >= 0; o--) e = a.type == i.CHART_TYPE_PIE || a.type == i.CHART_TYPE_FUNNEL ? n.get(a.shapeList[o], "name") : (n.get(a.shapeList[o], "series") || {}).name,
                e != r || a.shapeList[o].invisible || a.shapeList[o].__animating || a.zr.addHoverShape(a.shapeList[o])
            },
            e && e.bind(i.EVENT.LEGEND_HOVERLINK, this._onlegendhoverlink)
        }
        var i = t("../config"),
        n = t("../util/ecData"),
        r = t("../util/ecQuery"),
        o = t("../util/number"),
        s = t("zrender/tool/util");
        return e.prototype = {
            canvasSupported: t("zrender/tool/env").canvasSupported,
            _getZ: function(t) {
                if (null != this[t]) return this[t];
                var e = this.ecTheme[this.type];
                return e && null != e[t] ? e[t] : (e = i[this.type], e && null != e[t] ? e[t] : 0)
            },
            getZlevelBase: function() {
                return this._getZ("zlevel")
            },
            getZBase: function() {
                return this._getZ("z")
            },
            reformOption: function(t) {
                return t = s.merge(s.merge(t || {},
                s.clone(this.ecTheme[this.type] || {})), s.clone(i[this.type] || {})),
                this.z = t.z,
                this.zlevel = t.zlevel,
                t
            },
            reformCssArray: function(t) {
                if (! (t instanceof Array)) return [t, t, t, t];
                switch (t.length + "") {
                case "4":
                    return t;
                case "3":
                    return [t[0], t[1], t[2], t[1]];
                case "2":
                    return [t[0], t[1], t[0], t[1]];
                case "1":
                    return [t[0], t[0], t[0], t[0]];
                case "0":
                    return [0, 0, 0, 0]
                }
            },
            getShapeById: function(t) {
                for (var e = 0,
                i = this.shapeList.length; i > e; e++) if (this.shapeList[e].id === t) return this.shapeList[e];
                return null
            },
            getFont: function(t) {
                var e = this.getTextStyle(s.clone(t));
                return e.fontStyle + " " + e.fontWeight + " " + e.fontSize + "px " + e.fontFamily
            },
            getTextStyle: function(t) {
                return s.merge(s.merge(t || {},
                this.ecTheme.textStyle), i.textStyle)
            },
            getItemStyleColor: function(t, e, i, n) {
                return "function" == typeof t ? t.call(this.myChart, {
                    seriesIndex: e,
                    series: this.series[e],
                    dataIndex: i,
                    data: n
                }) : t
            },
            getDataFromOption: function(t, e) {
                return null != t ? null != t.value ? t.value: t: e
            },
            subPixelOptimize: function(t, e) {
                return t = e % 2 === 1 ? Math.floor(t) + .5 : Math.round(t)
            },
            resize: function() {
                this.refresh && this.refresh(),
                this.clearEffectShape && this.clearEffectShape(!0);
                var t = this;
                setTimeout(function() {
                    t.animationEffect && t.animationEffect()
                },
                200)
            },
            clear: function() {
                this.clearEffectShape && this.clearEffectShape(),
                this.zr && this.zr.delShape(this.shapeList),
                this.shapeList = []
            },
            dispose: function() {
                this.onbeforDispose && this.onbeforDispose(),
                this.clear(),
                this.shapeList = null,
                this.effectList = null,
                this.messageCenter && this.messageCenter.unbind(i.EVENT.LEGEND_HOVERLINK, this._onlegendhoverlink),
                this.onafterDispose && this.onafterDispose()
            },
            query: r.query,
            deepQuery: r.deepQuery,
            deepMerge: r.deepMerge,
            parsePercent: o.parsePercent,
            parseCenter: o.parseCenter,
            parseRadius: o.parseRadius,
            numAddCommas: o.addCommas
        },
        e
    }),
    i("echarts/layout/EdgeBundling", ["require", "../data/KDTree", "zrender/tool/vector"],
    function(t) {
        function e(t, e) {
            t = t.array,
            e = e.array;
            var i = e[0] - t[0],
            n = e[1] - t[1],
            r = e[2] - t[2],
            o = e[3] - t[3];
            return i * i + n * n + r * r + o * o
        }
        function i(t) {
            this.points = [t.mp0, t.mp1],
            this.group = t
        }
        function n(t) {
            var e = t.points;
            e[0][1] < e[1][1] || t instanceof i ? (this.array = [e[0][0], e[0][1], e[1][0], e[1][1]], this._startPoint = e[0], this._endPoint = e[1]) : (this.array = [e[1][0], e[1][1], e[0][0], e[0][1]], this._startPoint = e[1], this._endPoint = e[0]),
            this.ink = c(e[0], e[1]),
            this.edge = t,
            this.group = null
        }
        function r() {
            this.edgeList = [],
            this.mp0 = l(),
            this.mp1 = l(),
            this.ink = 0
        }
        function o() {
            this.maxNearestEdge = 6,
            this.maxTurningAngle = Math.PI / 4,
            this.maxIteration = 20
        }
        var s = t("../data/KDTree"),
        a = t("zrender/tool/vector"),
        l = a.create,
        h = a.distSquare,
        c = a.dist,
        d = a.copy,
        u = a.clone;
        return n.prototype.getStartPoint = function() {
            return this._startPoint
        },
        n.prototype.getEndPoint = function() {
            return this._endPoint
        },
        r.prototype.addEdge = function(t) {
            t.group = this,
            this.edgeList.push(t)
        },
        r.prototype.removeEdge = function(t) {
            t.group = null,
            this.edgeList.splice(this.edgeList.indexOf(t), 1)
        },
        o.prototype = {
            constructor: o,
            run: function(t) {
                function e(t, e) {
                    return h(t, e) < 1e-10
                }
                function n(t, i) {
                    for (var n = [], r = 0, o = 0; o < t.length; o++) r > 0 && e(t[o], n[r - 1]) || (n[r++] = u(t[o]));
                    return i[0] && !e(n[0], i[0]) && (n = n.reverse()),
                    n
                }
                for (var r = this._iterate(t), o = 0; o++<this.maxIteration;) {
                    for (var s = [], a = 0; a < r.groups.length; a++) s.push(new i(r.groups[a]));
                    var l = this._iterate(s);
                    if (l.savedInk <= 0) break;
                    r = l
                }
                var c = [],
                d = function(t, e) {
                    for (var r, o = 0; o < t.length; o++) {
                        var s = t[o];
                        if (s.edgeList[0] && s.edgeList[0].edge instanceof i) {
                            for (var a = [], l = 0; l < s.edgeList.length; l++) a.push(s.edgeList[l].edge.group);
                            r = e ? e.slice() : [],
                            r.unshift(s.mp0),
                            r.push(s.mp1),
                            d(a, r)
                        } else for (var l = 0; l < s.edgeList.length; l++) {
                            var h = s.edgeList[l];
                            r = e ? e.slice() : [],
                            r.unshift(s.mp0),
                            r.push(s.mp1),
                            r.unshift(h.getStartPoint()),
                            r.push(h.getEndPoint()),
                            c.push({
                                points: n(r, h.edge.points),
                                rawEdge: h.edge
                            })
                        }
                    }
                };
                return d(r.groups),
                c
            },
            _iterate: function(t) {
                for (var i = [], o = [], a = 0, h = 0; h < t.length; h++) {
                    var c = new n(t[h]);
                    i.push(c)
                }
                for (var u = new s(i, 4), p = [], f = l(), g = l(), m = 0, _ = l(), y = l(), v = 0, h = 0; h < i.length; h++) {
                    var c = i[h];
                    if (!c.group) {
                        u.nearestN(c, this.maxNearestEdge, e, p);
                        for (var b = 0,
                        x = null,
                        T = null,
                        w = 0; w < p.length; w++) {
                            var S = p[w],
                            C = 0;
                            S.group ? S.group !== T && (T = S.group, m = this._calculateGroupEdgeInk(S.group, c, f, g), C = S.group.ink + c.ink - m) : (m = this._calculateEdgeEdgeInk(c, S, f, g), C = S.ink + c.ink - m),
                            C > b && (b = C, x = S, d(y, g), d(_, f), v = m)
                        }
                        if (x) {
                            a += b;
                            var k;
                            x.group || (k = new r, o.push(k), k.addEdge(x)),
                            k = x.group,
                            d(k.mp0, _),
                            d(k.mp1, y),
                            k.ink = v,
                            x.group.addEdge(c)
                        } else {
                            var k = new r;
                            o.push(k),
                            d(k.mp0, c.getStartPoint()),
                            d(k.mp1, c.getEndPoint()),
                            k.ink = c.ink,
                            k.addEdge(c)
                        }
                    }
                }
                return {
                    groups: o,
                    edges: i,
                    savedInk: a
                }
            },
            _calculateEdgeEdgeInk: function() {
                var t = [],
                e = [];
                return function(i, n, r, o) {
                    t[0] = i.getStartPoint(),
                    t[1] = n.getStartPoint(),
                    e[0] = i.getEndPoint(),
                    e[1] = n.getEndPoint(),
                    this._calculateMeetPoints(t, e, r, o);
                    var s = c(t[0], r) + c(r, o) + c(o, e[0]) + c(t[1], r) + c(o, e[1]);
                    return s
                }
            } (),
            _calculateGroupEdgeInk: function(t, e, i, n) {
                for (var r = [], o = [], s = 0; s < t.edgeList.length; s++) {
                    var a = t.edgeList[s];
                    r.push(a.getStartPoint()),
                    o.push(a.getEndPoint())
                }
                r.push(e.getStartPoint()),
                o.push(e.getEndPoint()),
                this._calculateMeetPoints(r, o, i, n);
                for (var l = c(i, n), s = 0; s < r.length; s++) l += c(r[s], i) + c(o[s], n);
                return l
            },
            _calculateMeetPoints: function() {
                var t = l(),
                e = l();
                return function(i, n, r, o) {
                    a.set(t, 0, 0),
                    a.set(e, 0, 0);
                    for (var s = i.length,
                    l = 0; s > l; l++) a.add(t, t, i[l]);
                    a.scale(t, t, 1 / s),
                    s = n.length;
                    for (var l = 0; s > l; l++) a.add(e, e, n[l]);
                    a.scale(e, e, 1 / s),
                    this._limitTurningAngle(i, t, e, r),
                    this._limitTurningAngle(n, e, t, o)
                }
            } (),
            _limitTurningAngle: function() {
                var t = l(),
                e = l(),
                i = l(),
                n = l();
                return function(r, o, s, l) {
                    var d = Math.cos(this.maxTurningAngle),
                    u = Math.tan(this.maxTurningAngle);
                    a.sub(t, o, s),
                    a.normalize(t, t),
                    a.copy(l, o);
                    for (var p = 0,
                    f = 0; f < r.length; f++) {
                        var g = r[f];
                        a.sub(e, g, o);
                        var m = a.len(e);
                        a.scale(e, e, 1 / m);
                        var _ = a.dot(e, t);
                        if (d > _) {
                            a.scaleAndAdd(i, o, t, m * _);
                            var y = c(i, g),
                            v = y / u;
                            a.scaleAndAdd(n, i, t, -v);
                            var b = h(n, o);
                            b > p && (p = b, a.copy(l, n))
                        }
                    }
                }
            } ()
        },
        o
    }),
    i("zrender/tool/area", ["require", "./util", "./curve"],
    function(t) {
        "use strict";
        function e(t) {
            return t %= P,
            0 > t && (t += P),
            t
        }
        function i(t, e, i, o) {
            if (!e || !t) return ! 1;
            var s = t.type;
            S = S || C.getContext();
            var a = n(t, e, i, o);
            if ("undefined" != typeof a) return a;
            if (t.buildPath && S.isPointInPath) return r(t, S, e, i, o);
            switch (s) {
            case "ellipse":
                return ! 0;
            case "trochoid":
                var l = "out" == e.location ? e.r1 + e.r2 + e.d: e.r1 - e.r2 + e.d;
                return p(e, i, o, l);
            case "rose":
                return p(e, i, o, e.maxr);
            default:
                return ! 1
            }
        }
        function n(t, e, i, n) {
            var r = t.type;
            switch (r) {
            case "bezier-curve":
                return "undefined" == typeof e.cpX2 ? l(e.xStart, e.yStart, e.cpX1, e.cpY1, e.xEnd, e.yEnd, e.lineWidth, i, n) : a(e.xStart, e.yStart, e.cpX1, e.cpY1, e.cpX2, e.cpY2, e.xEnd, e.yEnd, e.lineWidth, i, n);
            case "line":
                return s(e.xStart, e.yStart, e.xEnd, e.yEnd, e.lineWidth, i, n);
            case "polyline":
                return c(e.pointList, e.lineWidth, i, n);
            case "ring":
                return d(e.x, e.y, e.r0, e.r, i, n);
            case "circle":
                return p(e.x, e.y, e.r, i, n);
            case "sector":
                var o = e.startAngle * Math.PI / 180,
                h = e.endAngle * Math.PI / 180;
                return e.clockWise || (o = -o, h = -h),
                f(e.x, e.y, e.r0, e.r, o, h, !e.clockWise, i, n);
            case "path":
                return e.pathArray && x(e.pathArray, Math.max(e.lineWidth, 5), e.brushType, i, n);
            case "polygon":
            case "star":
            case "isogon":
                return g(e.pointList, i, n);
            case "text":
                var m = e.__rect || t.getRect(e);
                return u(m.x, m.y, m.width, m.height, i, n);
            case "rectangle":
            case "image":
                return u(e.x, e.y, e.width, e.height, i, n)
            }
        }
        function r(t, e, i, n, r) {
            return e.beginPath(),
            t.buildPath(e, i),
            e.closePath(),
            e.isPointInPath(n, r)
        }
        function o(t, e, n, r) {
            return ! i(t, e, n, r)
        }
        function s(t, e, i, n, r, o, s) {
            if (0 === r) return ! 1;
            var a = Math.max(r, 5),
            l = 0,
            h = t;
            if (s > e + a && s > n + a || e - a > s && n - a > s || o > t + a && o > i + a || t - a > o && i - a > o) return ! 1;
            if (t === i) return Math.abs(o - t) <= a / 2;
            l = (e - n) / (t - i),
            h = (t * n - i * e) / (t - i);
            var c = l * o - s + h,
            d = c * c / (l * l + 1);
            return a / 2 * a / 2 >= d
        }
        function a(t, e, i, n, r, o, s, a, l, h, c) {
            if (0 === l) return ! 1;
            var d = Math.max(l, 5);
            if (c > e + d && c > n + d && c > o + d && c > a + d || e - d > c && n - d > c && o - d > c && a - d > c || h > t + d && h > i + d && h > r + d && h > s + d || t - d > h && i - d > h && r - d > h && s - d > h) return ! 1;
            var u = k.cubicProjectPoint(t, e, i, n, r, o, s, a, h, c, null);
            return d / 2 >= u
        }
        function l(t, e, i, n, r, o, s, a, l) {
            if (0 === s) return ! 1;
            var h = Math.max(s, 5);
            if (l > e + h && l > n + h && l > o + h || e - h > l && n - h > l && o - h > l || a > t + h && a > i + h && a > r + h || t - h > a && i - h > a && r - h > a) return ! 1;
            var c = k.quadraticProjectPoint(t, e, i, n, r, o, a, l, null);
            return h / 2 >= c
        }
        function h(t, i, n, r, o, s, a, l, h) {
            if (0 === a) return ! 1;
            var c = Math.max(a, 5);
            l -= t,
            h -= i;
            var d = Math.sqrt(l * l + h * h);
            if (d - c > n || n > d + c) return ! 1;
            if (Math.abs(r - o) >= P) return ! 0;
            if (s) {
                var u = r;
                r = e(o),
                o = e(u)
            } else r = e(r),
            o = e(o);
            r > o && (o += P);
            var p = Math.atan2(h, l);
            return 0 > p && (p += P),
            p >= r && o >= p || p + P >= r && o >= p + P
        }
        function c(t, e, i, n) {
            for (var e = Math.max(e, 10), r = 0, o = t.length - 1; o > r; r++) {
                var a = t[r][0],
                l = t[r][1],
                h = t[r + 1][0],
                c = t[r + 1][1];
                if (s(a, l, h, c, e, i, n)) return ! 0
            }
            return ! 1
        }
        function d(t, e, i, n, r, o) {
            var s = (r - t) * (r - t) + (o - e) * (o - e);
            return n * n > s && s > i * i
        }
        function u(t, e, i, n, r, o) {
            return r >= t && t + i >= r && o >= e && e + n >= o
        }
        function p(t, e, i, n, r) {
            return i * i > (n - t) * (n - t) + (r - e) * (r - e)
        }
        function f(t, e, i, n, r, o, s, a, l) {
            return h(t, e, (i + n) / 2, r, o, s, n - i, a, l)
        }
        function g(t, e, i) {
            for (var n = t.length,
            r = 0,
            o = 0,
            s = n - 1; n > o; o++) {
                var a = t[s][0],
                l = t[s][1],
                h = t[o][0],
                c = t[o][1];
                r += m(a, l, h, c, e, i),
                s = o
            }
            return 0 !== r
        }
        function m(t, e, i, n, r, o) {
            if (o > e && o > n || e > o && n > o) return 0;
            if (n == e) return 0;
            var s = e > n ? 1 : -1,
            a = (o - e) / (n - e),
            l = a * (i - t) + t;
            return l > r ? s: 0
        }
        function _() {
            var t = R[0];
            R[0] = R[1],
            R[1] = t
        }
        function y(t, e, i, n, r, o, s, a, l, h) {
            if (h > e && h > n && h > o && h > a || e > h && n > h && o > h && a > h) return 0;
            var c = k.cubicRootAt(e, n, o, a, h, I);
            if (0 === c) return 0;
            for (var d, u, p = 0,
            f = -1,
            g = 0; c > g; g++) {
                var m = I[g],
                y = k.cubicAt(t, i, r, s, m);
                l > y || (0 > f && (f = k.cubicExtrema(e, n, o, a, R), R[1] < R[0] && f > 1 && _(), d = k.cubicAt(e, n, o, a, R[0]), f > 1 && (u = k.cubicAt(e, n, o, a, R[1]))), p += 2 == f ? m < R[0] ? e > d ? 1 : -1 : m < R[1] ? d > u ? 1 : -1 : u > a ? 1 : -1 : m < R[0] ? e > d ? 1 : -1 : d > a ? 1 : -1)
            }
            return p
        }
        function v(t, e, i, n, r, o, s, a) {
            if (a > e && a > n && a > o || e > a && n > a && o > a) return 0;
            var l = k.quadraticRootAt(e, n, o, a, I);
            if (0 === l) return 0;
            var h = k.quadraticExtremum(e, n, o);
            if (h >= 0 && 1 >= h) {
                for (var c = 0,
                d = k.quadraticAt(e, n, o, h), u = 0; l > u; u++) {
                    var p = k.quadraticAt(t, i, r, I[u]);
                    s > p || (c += I[u] < h ? e > d ? 1 : -1 : d > o ? 1 : -1)
                }
                return c
            }
            var p = k.quadraticAt(t, i, r, I[0]);
            return s > p ? 0 : e > o ? 1 : -1
        }
        function b(t, i, n, r, o, s, a, l) {
            if (l -= i, l > n || -n > l) return 0;
            var h = Math.sqrt(n * n - l * l);
            if (I[0] = -h, I[1] = h, Math.abs(r - o) >= P) {
                r = 0,
                o = P;
                var c = s ? 1 : -1;
                return a >= I[0] + t && a <= I[1] + t ? c: 0
            }
            if (s) {
                var h = r;
                r = e(o),
                o = e(h)
            } else r = e(r),
            o = e(o);
            r > o && (o += P);
            for (var d = 0,
            u = 0; 2 > u; u++) {
                var p = I[u];
                if (p + t > a) {
                    var f = Math.atan2(l, p),
                    c = s ? 1 : -1;
                    0 > f && (f = P + f),
                    (f >= r && o >= f || f + P >= r && o >= f + P) && (f > Math.PI / 2 && f < 1.5 * Math.PI && (c = -c), d += c)
                }
            }
            return d
        }
        function x(t, e, i, n, r) {
            var o = 0,
            c = 0,
            d = 0,
            u = 0,
            p = 0,
            f = !0,
            g = !0;
            i = i || "fill";
            for (var _ = "stroke" === i || "both" === i,
            x = "fill" === i || "both" === i,
            T = 0; T < t.length; T++) {
                var w = t[T],
                S = w.points;
                if (f || "M" === w.command) {
                    if (T > 0 && (x && (o += m(c, d, u, p, n, r)), 0 !== o)) return ! 0;
                    u = S[S.length - 2],
                    p = S[S.length - 1],
                    f = !1,
                    g && "A" !== w.command && (g = !1, c = u, d = p)
                }
                switch (w.command) {
                case "M":
                    c = S[0],
                    d = S[1];
                    break;
                case "L":
                    if (_ && s(c, d, S[0], S[1], e, n, r)) return ! 0;
                    x && (o += m(c, d, S[0], S[1], n, r)),
                    c = S[0],
                    d = S[1];
                    break;
                case "C":
                    if (_ && a(c, d, S[0], S[1], S[2], S[3], S[4], S[5], e, n, r)) return ! 0;
                    x && (o += y(c, d, S[0], S[1], S[2], S[3], S[4], S[5], n, r)),
                    c = S[4],
                    d = S[5];
                    break;
                case "Q":
                    if (_ && l(c, d, S[0], S[1], S[2], S[3], e, n, r)) return ! 0;
                    x && (o += v(c, d, S[0], S[1], S[2], S[3], n, r)),
                    c = S[2],
                    d = S[3];
                    break;
                case "A":
                    var C = S[0],
                    k = S[1],
                    E = S[2],
                    z = S[3],
                    L = S[4],
                    M = S[5],
                    A = Math.cos(L) * E + C,
                    P = Math.sin(L) * z + k;
                    g ? (g = !1, u = A, p = P) : o += m(c, d, A, P);
                    var I = (n - C) * z / E + C;
                    if (_ && h(C, k, z, L, L + M, 1 - S[7], e, I, r)) return ! 0;
                    x && (o += b(C, k, z, L, L + M, 1 - S[7], I, r)),
                    c = Math.cos(L + M) * E + C,
                    d = Math.sin(L + M) * z + k;
                    break;
                case "z":
                    if (_ && s(c, d, u, p, e, n, r)) return ! 0;
                    f = !0
                }
            }
            return x && (o += m(c, d, u, p, n, r)),
            0 !== o
        }
        function T(t, e) {
            var i = t + ":" + e;
            if (E[i]) return E[i];
            S = S || C.getContext(),
            S.save(),
            e && (S.font = e),
            t = (t + "").split("\n");
            for (var n = 0,
            r = 0,
            o = t.length; o > r; r++) n = Math.max(S.measureText(t[r]).width, n);
            return S.restore(),
            E[i] = n,
            ++L > A && (L = 0, E = {}),
            n
        }
        function w(t, e) {
            var i = t + ":" + e;
            if (z[i]) return z[i];
            S = S || C.getContext(),
            S.save(),
            e && (S.font = e),
            t = (t + "").split("\n");
            var n = (S.measureText("国").width + 2) * t.length;
            return S.restore(),
            z[i] = n,
            ++M > A && (M = 0, z = {}),
            n
        }
        var S, C = t("./util"),
        k = t("./curve"),
        E = {},
        z = {},
        L = 0,
        M = 0,
        A = 5e3,
        P = 2 * Math.PI,
        I = [ - 1, -1, -1],
        R = [ - 1, -1];
        return {
            isInside: i,
            isOutside: o,
            getTextWidth: T,
            getTextHeight: w,
            isInsidePath: x,
            isInsidePolygon: g,
            isInsideSector: f,
            isInsideCircle: p,
            isInsideLine: s,
            isInsideRect: u,
            isInsidePolyline: c,
            isInsideCubicStroke: a,
            isInsideQuadraticStroke: l
        }
    }),
    i("zrender/dep/excanvas", ["require"],
    function() {
        return document.createElement("canvas").getContext ? G_vmlCanvasManager = !1 : !
        function() {
            function t() {
                return this.context_ || (this.context_ = new b(this))
            }
            function e(t, e) {
                var i = N.call(arguments, 2);
                return function() {
                    return t.apply(e, i.concat(N.call(arguments)))
                }
            }
            function i(t) {
                return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
            }
            function n(t, e, i) {
                t.namespaces[e] || t.namespaces.add(e, i, "#default#VML")
            }
            function r(t) {
                if (n(t, "g_vml_", "urn:schemas-microsoft-com:vml"), n(t, "g_o_", "urn:schemas-microsoft-com:office:office"), !t.styleSheets.ex_canvas_) {
                    var e = t.createStyleSheet();
                    e.owningElement.id = "ex_canvas_",
                    e.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"
                }
            }
            function o(t) {
                var e = t.srcElement;
                switch (t.propertyName) {
                case "width":
                    e.getContext().clearRect(),
                    e.style.width = e.attributes.width.nodeValue + "px",
                    e.firstChild.style.width = e.clientWidth + "px";
                    break;
                case "height":
                    e.getContext().clearRect(),
                    e.style.height = e.attributes.height.nodeValue + "px",
                    e.firstChild.style.height = e.clientHeight + "px"
                }
            }
            function s(t) {
                var e = t.srcElement;
                e.firstChild && (e.firstChild.style.width = e.clientWidth + "px", e.firstChild.style.height = e.clientHeight + "px")
            }
            function a() {
                return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
            }
            function l(t, e) {
                for (var i = a(), n = 0; 3 > n; n++) for (var r = 0; 3 > r; r++) {
                    for (var o = 0,
                    s = 0; 3 > s; s++) o += t[n][s] * e[s][r];
                    i[n][r] = o
                }
                return i
            }
            function h(t, e) {
                e.fillStyle = t.fillStyle,
                e.lineCap = t.lineCap,
                e.lineJoin = t.lineJoin,
                e.lineWidth = t.lineWidth,
                e.miterLimit = t.miterLimit,
                e.shadowBlur = t.shadowBlur,
                e.shadowColor = t.shadowColor,
                e.shadowOffsetX = t.shadowOffsetX,
                e.shadowOffsetY = t.shadowOffsetY,
                e.strokeStyle = t.strokeStyle,
                e.globalAlpha = t.globalAlpha,
                e.font = t.font,
                e.textAlign = t.textAlign,
                e.textBaseline = t.textBaseline,
                e.scaleX_ = t.scaleX_,
                e.scaleY_ = t.scaleY_,
                e.lineScale_ = t.lineScale_
            }
            function c(t) {
                var e = t.indexOf("(", 3),
                i = t.indexOf(")", e + 1),
                n = t.substring(e + 1, i).split(",");
                return (4 != n.length || "a" != t.charAt(3)) && (n[3] = 1),
                n
            }
            function d(t) {
                return parseFloat(t) / 100
            }
            function u(t, e, i) {
                return Math.min(i, Math.max(e, t))
            }
            function p(t) {
                var e, i, n, r, o, s;
                if (r = parseFloat(t[0]) / 360 % 360, 0 > r && r++, o = u(d(t[1]), 0, 1), s = u(d(t[2]), 0, 1), 0 == o) e = i = n = s;
                else {
                    var a = .5 > s ? s * (1 + o) : s + o - s * o,
                    l = 2 * s - a;
                    e = f(l, a, r + 1 / 3),
                    i = f(l, a, r),
                    n = f(l, a, r - 1 / 3)
                }
                return "#" + $[Math.floor(255 * e)] + $[Math.floor(255 * i)] + $[Math.floor(255 * n)]
            }
            function f(t, e, i) {
                return 0 > i && i++,
                i > 1 && i--,
                1 > 6 * i ? t + 6 * (e - t) * i: 1 > 2 * i ? e: 2 > 3 * i ? t + (e - t) * (2 / 3 - i) * 6 : t
            }
            function g(t) {
                if (t in G) return G[t];
                var e, i = 1;
                if (t = String(t), "#" == t.charAt(0)) e = t;
                else if (/^rgb/.test(t)) {
                    for (var n, r = c(t), e = "#", o = 0; 3 > o; o++) n = -1 != r[o].indexOf("%") ? Math.floor(255 * d(r[o])) : +r[o],
                    e += $[u(n, 0, 255)];
                    i = +r[3]
                } else if (/^hsl/.test(t)) {
                    var r = c(t);
                    e = p(r),
                    i = r[3]
                } else e = V[t] || t;
                return G[t] = {
                    color: e,
                    alpha: i
                }
            }
            function m(t) {
                if (X[t]) return X[t];
                var e, i = document.createElement("div"),
                n = i.style;
                try {
                    n.font = t,
                    e = n.fontFamily.split(",")[0]
                } catch(r) {}
                return X[t] = {
                    style: n.fontStyle || j.style,
                    variant: n.fontVariant || j.variant,
                    weight: n.fontWeight || j.weight,
                    size: n.fontSize || j.size,
                    family: e || j.family
                }
            }
            function _(t, e) {
                var i = {};
                for (var n in t) i[n] = t[n];
                var r = parseFloat(e.currentStyle.fontSize),
                o = parseFloat(t.size);
                return i.size = "number" == typeof t.size ? t.size: -1 != t.size.indexOf("px") ? o: -1 != t.size.indexOf("em") ? r * o: -1 != t.size.indexOf("%") ? r / 100 * o: -1 != t.size.indexOf("pt") ? o / .75 : r,
                i
            }
            function y(t) {
                return t.style + " " + t.variant + " " + t.weight + " " + t.size + "px '" + t.family + "'"
            }
            function v(t) {
                return Z[t] || "square"
            }
            function b(t) {
                this.m_ = a(),
                this.mStack_ = [],
                this.aStack_ = [],
                this.currentPath_ = [],
                this.strokeStyle = "#000",
                this.fillStyle = "#000",
                this.lineWidth = 1,
                this.lineJoin = "miter",
                this.lineCap = "butt",
                this.miterLimit = 1 * B,
                this.globalAlpha = 1,
                this.font = "12px 微软雅黑",
                this.textAlign = "left",
                this.textBaseline = "alphabetic",
                this.canvas = t;
                var e = "width:" + t.clientWidth + "px;height:" + t.clientHeight + "px;overflow:hidden;position:absolute",
                i = t.ownerDocument.createElement("div");
                i.style.cssText = e,
                t.appendChild(i);
                var n = i.cloneNode(!1);
                n.style.backgroundColor = "#fff",
                n.style.filter = "alpha(opacity=0)",
                t.appendChild(n),
                this.element_ = i,
                this.scaleX_ = 1,
                this.scaleY_ = 1,
                this.lineScale_ = 1
            }
            function x(t, e, i, n) {
                t.currentPath_.push({
                    type: "bezierCurveTo",
                    cp1x: e.x,
                    cp1y: e.y,
                    cp2x: i.x,
                    cp2y: i.y,
                    x: n.x,
                    y: n.y
                }),
                t.currentX_ = n.x,
                t.currentY_ = n.y
            }
            function T(t, e) {
                var i = g(t.strokeStyle),
                n = i.color,
                r = i.alpha * t.globalAlpha,
                o = t.lineScale_ * t.lineWidth;
                1 > o && (r *= o),
                e.push("<g_vml_:stroke", ' opacity="', r, '"', ' joinstyle="', t.lineJoin, '"', ' miterlimit="', t.miterLimit, '"', ' endcap="', v(t.lineCap), '"', ' weight="', o, 'px"', ' color="', n, '" />')
            }
            function w(t, e, i, n) {
                var r = t.fillStyle,
                o = t.scaleX_,
                s = t.scaleY_,
                a = n.x - i.x,
                l = n.y - i.y;
                if (r instanceof E) {
                    var h = 0,
                    c = {
                        x: 0,
                        y: 0
                    },
                    d = 0,
                    u = 1;
                    if ("gradient" == r.type_) {
                        var p = r.x0_ / o,
                        f = r.y0_ / s,
                        m = r.x1_ / o,
                        _ = r.y1_ / s,
                        y = S(t, p, f),
                        v = S(t, m, _),
                        b = v.x - y.x,
                        x = v.y - y.y;
                        h = 180 * Math.atan2(b, x) / Math.PI,
                        0 > h && (h += 360),
                        1e-6 > h && (h = 0)
                    } else {
                        var y = S(t, r.x0_, r.y0_);
                        c = {
                            x: (y.x - i.x) / a,
                            y: (y.y - i.y) / l
                        },
                        a /= o * B,
                        l /= s * B;
                        var T = P.max(a, l);
                        d = 2 * r.r0_ / T,
                        u = 2 * r.r1_ / T - d
                    }
                    var w = r.colors_;
                    w.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    for (var C = w.length,
                    k = w[0].color, L = w[C - 1].color, M = w[0].alpha * t.globalAlpha, A = w[C - 1].alpha * t.globalAlpha, I = [], R = 0; C > R; R++) {
                        var O = w[R];
                        I.push(O.offset * u + d + " " + O.color)
                    }
                    e.push('<g_vml_:fill type="', r.type_, '"', ' method="none" focus="100%"', ' color="', k, '"', ' color2="', L, '"', ' colors="', I.join(","), '"', ' opacity="', A, '"', ' g_o_:opacity2="', M, '"', ' angle="', h, '"', ' focusposition="', c.x, ",", c.y, '" />')
                } else if (r instanceof z) {
                    if (a && l) {
                        var D = -i.x,
                        H = -i.y;
                        e.push("<g_vml_:fill", ' position="', D / a * o * o, ",", H / l * s * s, '"', ' type="tile"', ' src="', r.src_, '" />')
                    }
                } else {
                    var F = g(t.fillStyle),
                    N = F.color,
                    W = F.alpha * t.globalAlpha;
                    e.push('<g_vml_:fill color="', N, '" opacity="', W, '" />')
                }
            }
            function S(t, e, i) {
                var n = t.m_;
                return {
                    x: B * (e * n[0][0] + i * n[1][0] + n[2][0]) - F,
                    y: B * (e * n[0][1] + i * n[1][1] + n[2][1]) - F
                }
            }
            function C(t) {
                return isFinite(t[0][0]) && isFinite(t[0][1]) && isFinite(t[1][0]) && isFinite(t[1][1]) && isFinite(t[2][0]) && isFinite(t[2][1])
            }
            function k(t, e, i) {
                if (C(e) && (t.m_ = e, t.scaleX_ = Math.sqrt(e[0][0] * e[0][0] + e[0][1] * e[0][1]), t.scaleY_ = Math.sqrt(e[1][0] * e[1][0] + e[1][1] * e[1][1]), i)) {
                    var n = e[0][0] * e[1][1] - e[0][1] * e[1][0];
                    t.lineScale_ = H(D(n))
                }
            }
            function E(t) {
                this.type_ = t,
                this.x0_ = 0,
                this.y0_ = 0,
                this.r0_ = 0,
                this.x1_ = 0,
                this.y1_ = 0,
                this.r1_ = 0,
                this.colors_ = []
            }
            function z(t, e) {
                switch (M(t), e) {
                case "repeat":
                case null:
                case "":
                    this.repetition_ = "repeat";
                    break;
                case "repeat-x":
                case "repeat-y":
                case "no-repeat":
                    this.repetition_ = e;
                    break;
                default:
                    L("SYNTAX_ERR")
                }
                this.src_ = t.src,
                this.width_ = t.width,
                this.height_ = t.height
            }
            function L(t) {
                throw new A(t)
            }
            function M(t) {
                t && 1 == t.nodeType && "IMG" == t.tagName || L("TYPE_MISMATCH_ERR"),
                "complete" != t.readyState && L("INVALID_STATE_ERR")
            }
            function A(t) {
                this.code = this[t],
                this.message = t + ": DOM Exception " + this.code
            }
            var P = Math,
            I = P.round,
            R = P.sin,
            O = P.cos,
            D = P.abs,
            H = P.sqrt,
            B = 10,
            F = B / 2,
            N = ( + navigator.userAgent.match(/MSIE ([\d.]+)?/)[1], Array.prototype.slice);
            r(document);
            var W = {
                init: function(t) {
                    var i = t || document;
                    i.createElement("canvas"),
                    i.attachEvent("onreadystatechange", e(this.init_, this, i))
                },
                init_: function(t) {
                    for (var e = t.getElementsByTagName("canvas"), i = 0; i < e.length; i++) this.initElement(e[i])
                },
                initElement: function(e) {
                    if (!e.getContext) {
                        e.getContext = t,
                        r(e.ownerDocument),
                        e.innerHTML = "",
                        e.attachEvent("onpropertychange", o),
                        e.attachEvent("onresize", s);
                        var i = e.attributes;
                        i.width && i.width.specified ? e.style.width = i.width.nodeValue + "px": e.width = e.clientWidth,
                        i.height && i.height.specified ? e.style.height = i.height.nodeValue + "px": e.height = e.clientHeight
                    }
                    return e
                }
            };
            W.init();
            for (var $ = [], Y = 0; 16 > Y; Y++) for (var q = 0; 16 > q; q++) $[16 * Y + q] = Y.toString(16) + q.toString(16);
            var V = {
                aliceblue: "#F0F8FF",
                antiquewhite: "#FAEBD7",
                aquamarine: "#7FFFD4",
                azure: "#F0FFFF",
                beige: "#F5F5DC",
                bisque: "#FFE4C4",
                black: "#000000",
                blanchedalmond: "#FFEBCD",
                blueviolet: "#8A2BE2",
                brown: "#A52A2A",
                burlywood: "#DEB887",
                cadetblue: "#5F9EA0",
                chartreuse: "#7FFF00",
                chocolate: "#D2691E",
                coral: "#FF7F50",
                cornflowerblue: "#6495ED",
                cornsilk: "#FFF8DC",
                crimson: "#DC143C",
                cyan: "#00FFFF",
                darkblue: "#00008B",
                darkcyan: "#008B8B",
                darkgoldenrod: "#B8860B",
                darkgray: "#A9A9A9",
                darkgreen: "#006400",
                darkgrey: "#A9A9A9",
                darkkhaki: "#BDB76B",
                darkmagenta: "#8B008B",
                darkolivegreen: "#556B2F",
                darkorange: "#FF8C00",
                darkorchid: "#9932CC",
                darkred: "#8B0000",
                darksalmon: "#E9967A",
                darkseagreen: "#8FBC8F",
                darkslateblue: "#483D8B",
                darkslategray: "#2F4F4F",
                darkslategrey: "#2F4F4F",
                darkturquoise: "#00CED1",
                darkviolet: "#9400D3",
                deeppink: "#FF1493",
                deepskyblue: "#00BFFF",
                dimgray: "#696969",
                dimgrey: "#696969",
                dodgerblue: "#1E90FF",
                firebrick: "#B22222",
                floralwhite: "#FFFAF0",
                forestgreen: "#228B22",
                gainsboro: "#DCDCDC",
                ghostwhite: "#F8F8FF",
                gold: "#FFD700",
                goldenrod: "#DAA520",
                grey: "#808080",
                greenyellow: "#ADFF2F",
                honeydew: "#F0FFF0",
                hotpink: "#FF69B4",
                indianred: "#CD5C5C",
                indigo: "#4B0082",
                ivory: "#FFFFF0",
                khaki: "#F0E68C",
                lavender: "#E6E6FA",
                lavenderblush: "#FFF0F5",
                lawngreen: "#7CFC00",
                lemonchiffon: "#FFFACD",
                lightblue: "#ADD8E6",
                lightcoral: "#F08080",
                lightcyan: "#E0FFFF",
                lightgoldenrodyellow: "#FAFAD2",
                lightgreen: "#90EE90",
                lightgrey: "#D3D3D3",
                lightpink: "#FFB6C1",
                lightsalmon: "#FFA07A",
                lightseagreen: "#20B2AA",
                lightskyblue: "#87CEFA",
                lightslategray: "#778899",
                lightslategrey: "#778899",
                lightsteelblue: "#B0C4DE",
                lightyellow: "#FFFFE0",
                limegreen: "#32CD32",
                linen: "#FAF0E6",
                magenta: "#FF00FF",
                mediumaquamarine: "#66CDAA",
                mediumblue: "#0000CD",
                mediumorchid: "#BA55D3",
                mediumpurple: "#9370DB",
                mediumseagreen: "#3CB371",
                mediumslateblue: "#7B68EE",
                mediumspringgreen: "#00FA9A",
                mediumturquoise: "#48D1CC",
                mediumvioletred: "#C71585",
                midnightblue: "#191970",
                mintcream: "#F5FFFA",
                mistyrose: "#FFE4E1",
                moccasin: "#FFE4B5",
                navajowhite: "#FFDEAD",
                oldlace: "#FDF5E6",
                olivedrab: "#6B8E23",
                orange: "#FFA500",
                orangered: "#FF4500",
                orchid: "#DA70D6",
                palegoldenrod: "#EEE8AA",
                palegreen: "#98FB98",
                paleturquoise: "#AFEEEE",
                palevioletred: "#DB7093",
                papayawhip: "#FFEFD5",
                peachpuff: "#FFDAB9",
                peru: "#CD853F",
                pink: "#FFC0CB",
                plum: "#DDA0DD",
                powderblue: "#B0E0E6",
                rosybrown: "#BC8F8F",
                royalblue: "#4169E1",
                saddlebrown: "#8B4513",
                salmon: "#FA8072",
                sandybrown: "#F4A460",
                seagreen: "#2E8B57",
                seashell: "#FFF5EE",
                sienna: "#A0522D",
                skyblue: "#87CEEB",
                slateblue: "#6A5ACD",
                slategray: "#708090",
                slategrey: "#708090",
                snow: "#FFFAFA",
                springgreen: "#00FF7F",
                steelblue: "#4682B4",
                tan: "#D2B48C",
                thistle: "#D8BFD8",
                tomato: "#FF6347",
                turquoise: "#40E0D0",
                violet: "#EE82EE",
                wheat: "#F5DEB3",
                whitesmoke: "#F5F5F5",
                yellowgreen: "#9ACD32"
            },
            G = {},
            j = {
                style: "normal",
                variant: "normal",
                weight: "normal",
                size: 12,
                family: "微软雅黑"
            },
            X = {},
            Z = {
                butt: "flat",
                round: "round"
            },
            U = b.prototype;
            U.clearRect = function() {
                this.textMeasureEl_ && (this.textMeasureEl_.removeNode(!0), this.textMeasureEl_ = null),
                this.element_.innerHTML = ""
            },
            U.beginPath = function() {
                this.currentPath_ = []
            },
            U.moveTo = function(t, e) {
                var i = S(this, t, e);
                this.currentPath_.push({
                    type: "moveTo",
                    x: i.x,
                    y: i.y
                }),
                this.currentX_ = i.x,
                this.currentY_ = i.y
            },
            U.lineTo = function(t, e) {
                var i = S(this, t, e);
                this.currentPath_.push({
                    type: "lineTo",
                    x: i.x,
                    y: i.y
                }),
                this.currentX_ = i.x,
                this.currentY_ = i.y
            },
            U.bezierCurveTo = function(t, e, i, n, r, o) {
                var s = S(this, r, o),
                a = S(this, t, e),
                l = S(this, i, n);
                x(this, a, l, s)
            },
            U.quadraticCurveTo = function(t, e, i, n) {
                var r = S(this, t, e),
                o = S(this, i, n),
                s = {
                    x: this.currentX_ + 2 / 3 * (r.x - this.currentX_),
                    y: this.currentY_ + 2 / 3 * (r.y - this.currentY_)
                },
                a = {
                    x: s.x + (o.x - this.currentX_) / 3,
                    y: s.y + (o.y - this.currentY_) / 3
                };
                x(this, s, a, o)
            },
            U.arc = function(t, e, i, n, r, o) {
                i *= B;
                var s = o ? "at": "wa",
                a = t + O(n) * i - F,
                l = e + R(n) * i - F,
                h = t + O(r) * i - F,
                c = e + R(r) * i - F;
                a != h || o || (a += .125);
                var d = S(this, t, e),
                u = S(this, a, l),
                p = S(this, h, c);
                this.currentPath_.push({
                    type: s,
                    x: d.x,
                    y: d.y,
                    radius: i,
                    xStart: u.x,
                    yStart: u.y,
                    xEnd: p.x,
                    yEnd: p.y
                })
            },
            U.rect = function(t, e, i, n) {
                this.moveTo(t, e),
                this.lineTo(t + i, e),
                this.lineTo(t + i, e + n),
                this.lineTo(t, e + n),
                this.closePath()
            },
            U.strokeRect = function(t, e, i, n) {
                var r = this.currentPath_;
                this.beginPath(),
                this.moveTo(t, e),
                this.lineTo(t + i, e),
                this.lineTo(t + i, e + n),
                this.lineTo(t, e + n),
                this.closePath(),
                this.stroke(),
                this.currentPath_ = r
            },
            U.fillRect = function(t, e, i, n) {
                var r = this.currentPath_;
                this.beginPath(),
                this.moveTo(t, e),
                this.lineTo(t + i, e),
                this.lineTo(t + i, e + n),
                this.lineTo(t, e + n),
                this.closePath(),
                this.fill(),
                this.currentPath_ = r
            },
            U.createLinearGradient = function(t, e, i, n) {
                var r = new E("gradient");
                return r.x0_ = t,
                r.y0_ = e,
                r.x1_ = i,
                r.y1_ = n,
                r
            },
            U.createRadialGradient = function(t, e, i, n, r, o) {
                var s = new E("gradientradial");
                return s.x0_ = t,
                s.y0_ = e,
                s.r0_ = i,
                s.x1_ = n,
                s.y1_ = r,
                s.r1_ = o,
                s
            },
            U.drawImage = function(t) {
                var e, i, n, r, o, s, a, l, h = t.runtimeStyle.width,
                c = t.runtimeStyle.height;
                t.runtimeStyle.width = "auto",
                t.runtimeStyle.height = "auto";
                var d = t.width,
                u = t.height;
                if (t.runtimeStyle.width = h, t.runtimeStyle.height = c, 3 == arguments.length) e = arguments[1],
                i = arguments[2],
                o = s = 0,
                a = n = d,
                l = r = u;
                else if (5 == arguments.length) e = arguments[1],
                i = arguments[2],
                n = arguments[3],
                r = arguments[4],
                o = s = 0,
                a = d,
                l = u;
                else {
                    if (9 != arguments.length) throw Error("Invalid number of arguments");
                    o = arguments[1],
                    s = arguments[2],
                    a = arguments[3],
                    l = arguments[4],
                    e = arguments[5],
                    i = arguments[6],
                    n = arguments[7],
                    r = arguments[8]
                }
                var p = S(this, e, i),
                f = [],
                g = 10,
                m = 10,
                _ = v = 1;
                if (f.push(" <g_vml_:group", ' coordsize="', B * g, ",", B * m, '"', ' coordorigin="0,0"', ' style="width:', g, "px;height:", m, "px;position:absolute;"), 1 != this.m_[0][0] || this.m_[0][1] || 1 != this.m_[1][1] || this.m_[1][0]) {
                    var y = [],
                    _ = this.scaleX_,
                    v = this.scaleY_;
                    y.push("M11=", this.m_[0][0] / _, ",", "M12=", this.m_[1][0] / v, ",", "M21=", this.m_[0][1] / _, ",", "M22=", this.m_[1][1] / v, ",", "Dx=", I(p.x / B), ",", "Dy=", I(p.y / B), "");
                    var b = p,
                    x = S(this, e + n, i),
                    T = S(this, e, i + r),
                    w = S(this, e + n, i + r);
                    b.x = P.max(b.x, x.x, T.x, w.x),
                    b.y = P.max(b.y, x.y, T.y, w.y),
                    f.push("padding:0 ", I(b.x / B), "px ", I(b.y / B), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", y.join(""), ", SizingMethod='clip');")
                } else f.push("top:", I(p.y / B), "px;left:", I(p.x / B), "px;");
                f.push(' ">'),
                (o || s) && f.push('<div style="overflow: hidden; width:', Math.ceil((n + o * n / a) * _), "px;", " height:", Math.ceil((r + s * r / l) * v), "px;", " filter:progid:DxImageTransform.Microsoft.Matrix(Dx=", -o * n / a * _, ",Dy=", -s * r / l * v, ');">'),
                f.push('<div style="width:', Math.round(_ * d * n / a), "px;", " height:", Math.round(v * u * r / l), "px;", " filter:"),
                this.globalAlpha < 1 && f.push(" progid:DXImageTransform.Microsoft.Alpha(opacity=" + 100 * this.globalAlpha + ")"),
                f.push(" progid:DXImageTransform.Microsoft.AlphaImageLoader(src=", t.src, ',sizingMethod=scale)">'),
                (o || s) && f.push("</div>"),
                f.push("</div></div>"),
                this.element_.insertAdjacentHTML("BeforeEnd", f.join(""))
            },
            U.stroke = function(t) {
                var e = [],
                i = 10,
                n = 10;
                e.push("<g_vml_:shape", ' filled="', !!t, '"', ' style="position:absolute;width:', i, "px;height:", n, 'px;"', ' coordorigin="0,0"', ' coordsize="', B * i, ",", B * n, '"', ' stroked="', !t, '"', ' path="');
                for (var r = {
                    x: null,
                    y: null
                },
                o = {
                    x: null,
                    y: null
                },
                s = 0; s < this.currentPath_.length; s++) {
                    var a, l = this.currentPath_[s];
                    switch (l.type) {
                    case "moveTo":
                        a = l,
                        e.push(" m ", I(l.x), ",", I(l.y));
                        break;
                    case "lineTo":
                        e.push(" l ", I(l.x), ",", I(l.y));
                        break;
                    case "close":
                        e.push(" x "),
                        l = null;
                        break;
                    case "bezierCurveTo":
                        e.push(" c ", I(l.cp1x), ",", I(l.cp1y), ",", I(l.cp2x), ",", I(l.cp2y), ",", I(l.x), ",", I(l.y));
                        break;
                    case "at":
                    case "wa":
                        e.push(" ", l.type, " ", I(l.x - this.scaleX_ * l.radius), ",", I(l.y - this.scaleY_ * l.radius), " ", I(l.x + this.scaleX_ * l.radius), ",", I(l.y + this.scaleY_ * l.radius), " ", I(l.xStart), ",", I(l.yStart), " ", I(l.xEnd), ",", I(l.yEnd))
                    }
                    l && ((null == r.x || l.x < r.x) && (r.x = l.x), (null == o.x || l.x > o.x) && (o.x = l.x), (null == r.y || l.y < r.y) && (r.y = l.y), (null == o.y || l.y > o.y) && (o.y = l.y))
                }
                e.push(' ">'),
                t ? w(this, e, r, o) : T(this, e),
                e.push("</g_vml_:shape>"),
                this.element_.insertAdjacentHTML("beforeEnd", e.join(""))
            },
            U.fill = function() {
                this.stroke(!0)
            },
            U.closePath = function() {
                this.currentPath_.push({
                    type: "close"
                })
            },
            U.save = function() {
                var t = {};
                h(this, t),
                this.aStack_.push(t),
                this.mStack_.push(this.m_),
                this.m_ = l(a(), this.m_)
            },
            U.restore = function() {
                this.aStack_.length && (h(this.aStack_.pop(), this), this.m_ = this.mStack_.pop())
            },
            U.translate = function(t, e) {
                var i = [[1, 0, 0], [0, 1, 0], [t, e, 1]];
                k(this, l(i, this.m_), !1)
            },
            U.rotate = function(t) {
                var e = O(t),
                i = R(t),
                n = [[e, i, 0], [ - i, e, 0], [0, 0, 1]];
                k(this, l(n, this.m_), !1)
            },
            U.scale = function(t, e) {
                var i = [[t, 0, 0], [0, e, 0], [0, 0, 1]];
                k(this, l(i, this.m_), !0)
            },
            U.transform = function(t, e, i, n, r, o) {
                var s = [[t, e, 0], [i, n, 0], [r, o, 1]];
                k(this, l(s, this.m_), !0)
            },
            U.setTransform = function(t, e, i, n, r, o) {
                var s = [[t, e, 0], [i, n, 0], [r, o, 1]];
                k(this, s, !0)
            },
            U.drawText_ = function(t, e, n, r, o) {
                var s = this.m_,
                a = 1e3,
                l = 0,
                h = a,
                c = {
                    x: 0,
                    y: 0
                },
                d = [],
                u = _(m(this.font), this.element_),
                p = y(u),
                f = this.element_.currentStyle,
                g = this.textAlign.toLowerCase();
                switch (g) {
                case "left":
                case "center":
                case "right":
                    break;
                case "end":
                    g = "ltr" == f.direction ? "right": "left";
                    break;
                case "start":
                    g = "rtl" == f.direction ? "right": "left";
                    break;
                default:
                    g = "left"
                }
                switch (this.textBaseline) {
                case "hanging":
                case "top":
                    c.y = u.size / 1.75;
                    break;
                case "middle":
                    break;
                default:
                case null:
                case "alphabetic":
                case "ideographic":
                case "bottom":
                    c.y = -u.size / 2.25
                }
                switch (g) {
                case "right":
                    l = a,
                    h = .05;
                    break;
                case "center":
                    l = h = a / 2
                }
                var v = S(this, e + c.x, n + c.y);
                d.push('<g_vml_:line from="', -l, ' 0" to="', h, ' 0.05" ', ' coordsize="100 100" coordorigin="0 0"', ' filled="', !o, '" stroked="', !!o, '" style="position:absolute;width:1px;height:1px;">'),
                o ? T(this, d) : w(this, d, {
                    x: -l,
                    y: 0
                },
                {
                    x: h,
                    y: u.size
                });
                var b = s[0][0].toFixed(3) + "," + s[1][0].toFixed(3) + "," + s[0][1].toFixed(3) + "," + s[1][1].toFixed(3) + ",0,0",
                x = I(v.x / B) + "," + I(v.y / B);
                d.push('<g_vml_:skew on="t" matrix="', b, '" ', ' offset="', x, '" origin="', l, ' 0" />', '<g_vml_:path textpathok="true" />', '<g_vml_:textpath on="true" string="', i(t), '" style="v-text-align:', g, ";font:", i(p), '" /></g_vml_:line>'),
                this.element_.insertAdjacentHTML("beforeEnd", d.join(""))
            },
            U.fillText = function(t, e, i, n) {
                this.drawText_(t, e, i, n, !1)
            },
            U.strokeText = function(t, e, i, n) {
                this.drawText_(t, e, i, n, !0)
            },
            U.measureText = function(t) {
                if (!this.textMeasureEl_) {
                    var e = '<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';
                    this.element_.insertAdjacentHTML("beforeEnd", e),
                    this.textMeasureEl_ = this.element_.lastChild
                }
                var i = this.element_.ownerDocument;
                this.textMeasureEl_.innerHTML = "";
                try {
                    this.textMeasureEl_.style.font = this.font
                } catch(n) {}
                return this.textMeasureEl_.appendChild(i.createTextNode(t)),
                {
                    width: this.textMeasureEl_.offsetWidth
                }
            },
            U.clip = function() {},
            U.arcTo = function() {},
            U.createPattern = function(t, e) {
                return new z(t, e)
            },
            E.prototype.addColorStop = function(t, e) {
                e = g(e),
                this.colors_.push({
                    offset: t,
                    color: e.color,
                    alpha: e.alpha
                })
            };
            var Q = A.prototype = new Error;
            Q.INDEX_SIZE_ERR = 1,
            Q.DOMSTRING_SIZE_ERR = 2,
            Q.HIERARCHY_REQUEST_ERR = 3,
            Q.WRONG_DOCUMENT_ERR = 4,
            Q.INVALID_CHARACTER_ERR = 5,
            Q.NO_DATA_ALLOWED_ERR = 6,
            Q.NO_MODIFICATION_ALLOWED_ERR = 7,
            Q.NOT_FOUND_ERR = 8,
            Q.NOT_SUPPORTED_ERR = 9,
            Q.INUSE_ATTRIBUTE_ERR = 10,
            Q.INVALID_STATE_ERR = 11,
            Q.SYNTAX_ERR = 12,
            Q.INVALID_MODIFICATION_ERR = 13,
            Q.NAMESPACE_ERR = 14,
            Q.INVALID_ACCESS_ERR = 15,
            Q.VALIDATION_ERR = 16,
            Q.TYPE_MISMATCH_ERR = 17,
            G_vmlCanvasManager = W,
            CanvasRenderingContext2D = b,
            CanvasGradient = E,
            CanvasPattern = z,
            DOMException = A
        } (),
        G_vmlCanvasManager
    }),
    i("zrender/shape/Base", ["require", "../tool/matrix", "../tool/guid", "../tool/util", "../tool/log", "../mixin/Transformable", "../mixin/Eventful", "../tool/area", "../tool/color"],
    function(t) {
        function e(e, n, r, o, s, a, l) {
            s && (e.font = s),
            e.textAlign = a,
            e.textBaseline = l;
            var h = i(n, r, o, s, a, l);
            n = (n + "").split("\n");
            var c = t("../tool/area").getTextHeight("国", s);
            switch (l) {
            case "top":
                o = h.y;
                break;
            case "bottom":
                o = h.y + c;
                break;
            default:
                o = h.y + c / 2
            }
            for (var d = 0,
            u = n.length; u > d; d++) e.fillText(n[d], r, o),
            o += c
        }
        function i(e, i, n, r, o, s) {
            var a = t("../tool/area"),
            l = a.getTextWidth(e, r),
            h = a.getTextHeight("国", r);
            switch (e = (e + "").split("\n"), o) {
            case "end":
            case "right":
                i -= l;
                break;
            case "center":
                i -= l / 2
            }
            switch (s) {
            case "top":
                break;
            case "bottom":
                n -= h * e.length;
                break;
            default:
                n -= h * e.length / 2
            }
            return {
                x: i,
                y: n,
                width: l,
                height: h * e.length
            }
        }
        var n = window.G_vmlCanvasManager,
        r = t("../tool/matrix"),
        o = t("../tool/guid"),
        s = t("../tool/util"),
        a = t("../tool/log"),
        l = t("../mixin/Transformable"),
        h = t("../mixin/Eventful"),
        c = function(t) {
            t = t || {},
            this.id = t.id || o();
            for (var e in t) this[e] = t[e];
            this.style = this.style || {},
            this.highlightStyle = this.highlightStyle || null,
            this.parent = null,
            this.__dirty = !0,
            this.__clipShapes = [],
            l.call(this),
            h.call(this)
        };
        c.prototype.invisible = !1,
        c.prototype.ignore = !1,
        c.prototype.zlevel = 0,
        c.prototype.draggable = !1,
        c.prototype.clickable = !1,
        c.prototype.hoverable = !0,
        c.prototype.z = 0,
        c.prototype.brush = function(t, e) {
            var i = this.beforeBrush(t, e);
            switch (t.beginPath(), this.buildPath(t, i), i.brushType) {
            case "both":
                t.fill();
            case "stroke":
                i.lineWidth > 0 && t.stroke();
                break;
            default:
                t.fill()
            }
            this.drawText(t, i, this.style),
            this.afterBrush(t)
        },
        c.prototype.beforeBrush = function(t, e) {
            var i = this.style;
            return this.brushTypeOnly && (i.brushType = this.brushTypeOnly),
            e && (i = this.getHighlightStyle(i, this.highlightStyle || {},
            this.brushTypeOnly)),
            "stroke" == this.brushTypeOnly && (i.strokeColor = i.strokeColor || i.color),
            t.save(),
            this.doClip(t),
            this.setContext(t, i),
            this.setTransform(t),
            i
        },
        c.prototype.afterBrush = function(t) {
            t.restore()
        };
        var d = [["color", "fillStyle"], ["strokeColor", "strokeStyle"], ["opacity", "globalAlpha"], ["lineCap", "lineCap"], ["lineJoin", "lineJoin"], ["miterLimit", "miterLimit"], ["lineWidth", "lineWidth"], ["shadowBlur", "shadowBlur"], ["shadowColor", "shadowColor"], ["shadowOffsetX", "shadowOffsetX"], ["shadowOffsetY", "shadowOffsetY"]];
        c.prototype.setContext = function(t, e) {
            for (var i = 0,
            n = d.length; n > i; i++) {
                var r = d[i][0],
                o = e[r],
                s = d[i][1];
                "undefined" != typeof o && (t[s] = o)
            }
        };
        var u = r.create();
        return c.prototype.doClip = function(t) {
            if (this.__clipShapes && !n) for (var e = 0; e < this.__clipShapes.length; e++) {
                var i = this.__clipShapes[e];
                if (i.needTransform) {
                    var o = i.transform;
                    r.invert(u, o),
                    t.transform(o[0], o[1], o[2], o[3], o[4], o[5])
                }
                if (t.beginPath(), i.buildPath(t, i.style), t.clip(), i.needTransform) {
                    var o = u;
                    t.transform(o[0], o[1], o[2], o[3], o[4], o[5])
                }
            }
        },
        c.prototype.getHighlightStyle = function(e, i, n) {
            var r = {};
            for (var o in e) r[o] = e[o];
            var s = t("../tool/color"),
            a = s.getHighlightColor();
            "stroke" != e.brushType ? (r.strokeColor = a, r.lineWidth = (e.lineWidth || 1) + this.getHighlightZoom(), r.brushType = "both") : "stroke" != n ? (r.strokeColor = a, r.lineWidth = (e.lineWidth || 1) + this.getHighlightZoom()) : r.strokeColor = i.strokeColor || s.mix(e.strokeColor, s.toRGB(a));
            for (var o in i)"undefined" != typeof i[o] && (r[o] = i[o]);
            return r
        },
        c.prototype.getHighlightZoom = function() {
            return "text" != this.type ? 6 : 2
        },
        c.prototype.drift = function(t, e) {
            this.position[0] += t,
            this.position[1] += e
        },
        c.prototype.buildPath = function() {
            a("buildPath not implemented in " + this.type)
        },
        c.prototype.getRect = function() {
            a("getRect not implemented in " + this.type)
        },
        c.prototype.isCover = function(e, i) {
            var n = this.transformCoordToLocal(e, i);
            return e = n[0],
            i = n[1],
            this.isCoverRect(e, i) ? t("../tool/area").isInside(this, this.style, e, i) : !1
        },
        c.prototype.isCoverRect = function(t, e) {
            var i = this.style.__rect;
            return i || (i = this.style.__rect = this.getRect(this.style)),
            t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height
        },
        c.prototype.drawText = function(t, i, n) {
            if ("undefined" != typeof i.text && i.text !== !1) {
                var r = i.textColor || i.color || i.strokeColor;
                t.fillStyle = r;
                var o, s, a, l, h = 10,
                c = i.textPosition || this.textPosition || "top";
                switch (c) {
                case "inside":
                case "top":
                case "bottom":
                case "left":
                case "right":
                    if (this.getRect) {
                        var d = (n || i).__rect || this.getRect(n || i);
                        switch (c) {
                        case "inside":
                            a = d.x + d.width / 2,
                            l = d.y + d.height / 2,
                            o = "center",
                            s = "middle",
                            "stroke" != i.brushType && r == i.color && (t.fillStyle = "#fff");
                            break;
                        case "left":
                            a = d.x - h,
                            l = d.y + d.height / 2,
                            o = "end",
                            s = "middle";
                            break;
                        case "right":
                            a = d.x + d.width + h,
                            l = d.y + d.height / 2,
                            o = "start",
                            s = "middle";
                            break;
                        case "top":
                            a = d.x + d.width / 2,
                            l = d.y - h,
                            o = "center",
                            s = "bottom";
                            break;
                        case "bottom":
                            a = d.x + d.width / 2,
                            l = d.y + d.height + h,
                            o = "center",
                            s = "top"
                        }
                    }
                    break;
                case "start":
                case "end":
                    var u = i.pointList || [[i.xStart || 0, i.yStart || 0], [i.xEnd || 0, i.yEnd || 0]],
                    p = u.length;
                    if (2 > p) return;
                    var f, g, m, _;
                    switch (c) {
                    case "start":
                        f = u[1][0],
                        g = u[0][0],
                        m = u[1][1],
                        _ = u[0][1];
                        break;
                    case "end":
                        f = u[p - 2][0],
                        g = u[p - 1][0],
                        m = u[p - 2][1],
                        _ = u[p - 1][1]
                    }
                    a = g,
                    l = _;
                    var y = Math.atan((m - _) / (g - f)) / Math.PI * 180;
                    0 > g - f ? y += 180 : 0 > m - _ && (y += 360),
                    h = 5,
                    y >= 30 && 150 >= y ? (o = "center", s = "bottom", l -= h) : y > 150 && 210 > y ? (o = "right", s = "middle", a -= h) : y >= 210 && 330 >= y ? (o = "center", s = "top", l += h) : (o = "left", s = "middle", a += h);
                    break;
                case "specific":
                    a = i.textX || 0,
                    l = i.textY || 0,
                    o = "start",
                    s = "middle"
                }
                null != a && null != l && e(t, i.text, a, l, i.textFont, i.textAlign || o, i.textBaseline || s)
            }
        },
        c.prototype.modSelf = function() {
            this.__dirty = !0,
            this.style && (this.style.__rect = null),
            this.highlightStyle && (this.highlightStyle.__rect = null)
        },
        c.prototype.isSilent = function() {
            return ! (this.hoverable || this.draggable || this.clickable || this.onmousemove || this.onmouseover || this.onmouseout || this.onmousedown || this.onmouseup || this.onclick || this.ondragenter || this.ondragover || this.ondragleave || this.ondrop)
        },
        s.merge(c.prototype, l.prototype, !0),
        s.merge(c.prototype, h.prototype, !0),
        c
    }),
    i("zrender/mixin/Eventful", ["require"],
    function() {
        var t = function() {
            this._handlers = {}
        };
        return t.prototype.one = function(t, e, i) {
            var n = this._handlers;
            return e && t ? (n[t] || (n[t] = []), n[t].push({
                h: e,
                one: !0,
                ctx: i || this
            }), this) : this
        },
        t.prototype.bind = function(t, e, i) {
            var n = this._handlers;
            return e && t ? (n[t] || (n[t] = []), n[t].push({
                h: e,
                one: !1,
                ctx: i || this
            }), this) : this
        },
        t.prototype.unbind = function(t, e) {
            var i = this._handlers;
            if (!t) return this._handlers = {},
            this;
            if (e) {
                if (i[t]) {
                    for (var n = [], r = 0, o = i[t].length; o > r; r++) i[t][r].h != e && n.push(i[t][r]);
                    i[t] = n
                }
                i[t] && 0 === i[t].length && delete i[t]
            } else delete i[t];
            return this
        },
        t.prototype.dispatch = function(t) {
            if (this._handlers[t]) {
                var e = arguments,
                i = e.length;
                i > 3 && (e = Array.prototype.slice.call(e, 1));
                for (var n = this._handlers[t], r = n.length, o = 0; r > o;) {
                    switch (i) {
                    case 1:
                        n[o].h.call(n[o].ctx);
                        break;
                    case 2:
                        n[o].h.call(n[o].ctx, e[1]);
                        break;
                    case 3:
                        n[o].h.call(n[o].ctx, e[1], e[2]);
                        break;
                    default:
                        n[o].h.apply(n[o].ctx, e)
                    }
                    n[o].one ? (n.splice(o, 1), r--) : o++
                }
            }
            return this
        },
        t.prototype.dispatchWithContext = function(t) {
            if (this._handlers[t]) {
                var e = arguments,
                i = e.length;
                i > 4 && (e = Array.prototype.slice.call(e, 1, e.length - 1));
                for (var n = e[e.length - 1], r = this._handlers[t], o = r.length, s = 0; o > s;) {
                    switch (i) {
                    case 1:
                        r[s].h.call(n);
                        break;
                    case 2:
                        r[s].h.call(n, e[1]);
                        break;
                    case 3:
                        r[s].h.call(n, e[1], e[2]);
                        break;
                    default:
                        r[s].h.apply(n, e)
                    }
                    r[s].one ? (r.splice(s, 1), o--) : s++
                }
            }
            return this
        },
        t
    }),
    i("zrender/tool/matrix", [],
    function() {
        var t = "undefined" == typeof Float32Array ? Array: Float32Array,
        e = {
            create: function() {
                var i = new t(6);
                return e.identity(i),
                i
            },
            identity: function(t) {
                return t[0] = 1,
                t[1] = 0,
                t[2] = 0,
                t[3] = 1,
                t[4] = 0,
                t[5] = 0,
                t
            },
            copy: function(t, e) {
                return t[0] = e[0],
                t[1] = e[1],
                t[2] = e[2],
                t[3] = e[3],
                t[4] = e[4],
                t[5] = e[5],
                t
            },
            mul: function(t, e, i) {
                return t[0] = e[0] * i[0] + e[2] * i[1],
                t[1] = e[1] * i[0] + e[3] * i[1],
                t[2] = e[0] * i[2] + e[2] * i[3],
                t[3] = e[1] * i[2] + e[3] * i[3],
                t[4] = e[0] * i[4] + e[2] * i[5] + e[4],
                t[5] = e[1] * i[4] + e[3] * i[5] + e[5],
                t
            },
            translate: function(t, e, i) {
                return t[0] = e[0],
                t[1] = e[1],
                t[2] = e[2],
                t[3] = e[3],
                t[4] = e[4] + i[0],
                t[5] = e[5] + i[1],
                t
            },
            rotate: function(t, e, i) {
                var n = e[0],
                r = e[2],
                o = e[4],
                s = e[1],
                a = e[3],
                l = e[5],
                h = Math.sin(i),
                c = Math.cos(i);
                return t[0] = n * c + s * h,
                t[1] = -n * h + s * c,
                t[2] = r * c + a * h,
                t[3] = -r * h + c * a,
                t[4] = c * o + h * l,
                t[5] = c * l - h * o,
                t
            },
            scale: function(t, e, i) {
                var n = i[0],
                r = i[1];
                return t[0] = e[0] * n,
                t[1] = e[1] * r,
                t[2] = e[2] * n,
                t[3] = e[3] * r,
                t[4] = e[4] * n,
                t[5] = e[5] * r,
                t
            },
            invert: function(t, e) {
                var i = e[0],
                n = e[2],
                r = e[4],
                o = e[1],
                s = e[3],
                a = e[5],
                l = i * s - o * n;
                return l ? (l = 1 / l, t[0] = s * l, t[1] = -o * l, t[2] = -n * l, t[3] = i * l, t[4] = (n * a - s * r) * l, t[5] = (o * r - i * a) * l, t) : null
            }
        };
        return e
    }),
    i("zrender/tool/guid", [],
    function() {
        var t = 2311;
        return function() {
            return "zrender__" + t++
        }
    }),
    i("zrender/tool/log", ["require", "../config"],
    function(t) {
        var e = t("../config");
        return function() {
            if (0 !== e.debugMode) if (1 == e.debugMode) for (var t in arguments) throw new Error(arguments[t]);
            else if (e.debugMode > 1) for (var t in arguments) console.log(arguments[t])
        }
    }),
    i("zrender/mixin/Transformable", ["require", "../tool/matrix", "../tool/vector"],
    function(t) {
        "use strict";
        function e(t) {
            return t > -a && a > t
        }
        function i(t) {
            return t > a || -a > t
        }
        var n = t("../tool/matrix"),
        r = t("../tool/vector"),
        o = [0, 0],
        s = n.translate,
        a = 5e-5,
        l = function() {
            this.position || (this.position = [0, 0]),
            "undefined" == typeof this.rotation && (this.rotation = [0, 0, 0]),
            this.scale || (this.scale = [1, 1, 0, 0]),
            this.needLocalTransform = !1,
            this.needTransform = !1
        };
        return l.prototype = {
            constructor: l,
            updateNeedTransform: function() {
                this.needLocalTransform = i(this.rotation[0]) || i(this.position[0]) || i(this.position[1]) || i(this.scale[0] - 1) || i(this.scale[1] - 1)
            },
            updateTransform: function() {
                this.updateNeedTransform();
                var t = this.parent && this.parent.needTransform;
                if (this.needTransform = this.needLocalTransform || t, this.needTransform) {
                    var e = this.transform || n.create();
                    if (n.identity(e), this.needLocalTransform) {
                        var r = this.scale;
                        if (i(r[0]) || i(r[1])) {
                            o[0] = -r[2] || 0,
                            o[1] = -r[3] || 0;
                            var a = i(o[0]) || i(o[1]);
                            a && s(e, e, o),
                            n.scale(e, e, r),
                            a && (o[0] = -o[0], o[1] = -o[1], s(e, e, o))
                        }
                        if (this.rotation instanceof Array) {
                            if (0 !== this.rotation[0]) {
                                o[0] = -this.rotation[1] || 0,
                                o[1] = -this.rotation[2] || 0;
                                var a = i(o[0]) || i(o[1]);
                                a && s(e, e, o),
                                n.rotate(e, e, this.rotation[0]),
                                a && (o[0] = -o[0], o[1] = -o[1], s(e, e, o))
                            }
                        } else 0 !== this.rotation && n.rotate(e, e, this.rotation); (i(this.position[0]) || i(this.position[1])) && s(e, e, this.position)
                    }
                    t && (this.needLocalTransform ? n.mul(e, this.parent.transform, e) : n.copy(e, this.parent.transform)),
                    this.transform = e,
                    this.invTransform = this.invTransform || n.create(),
                    n.invert(this.invTransform, e)
                }
            },
            setTransform: function(t) {
                if (this.needTransform) {
                    var e = this.transform;
                    t.transform(e[0], e[1], e[2], e[3], e[4], e[5])
                }
            },
            lookAt: function() {
                var t = r.create();
                return function(i) {
                    this.transform || (this.transform = n.create());
                    var o = this.transform;
                    if (r.sub(t, i, this.position), !e(t[0]) || !e(t[1])) {
                        r.normalize(t, t);
                        var s = this.scale;
                        o[2] = t[0] * s[1],
                        o[3] = t[1] * s[1],
                        o[0] = t[1] * s[0],
                        o[1] = -t[0] * s[0],
                        o[4] = this.position[0],
                        o[5] = this.position[1],
                        this.decomposeTransform()
                    }
                }
            } (),
            decomposeTransform: function() {
                if (this.transform) {
                    var t = this.transform,
                    e = t[0] * t[0] + t[1] * t[1],
                    n = this.position,
                    r = this.scale,
                    o = this.rotation;
                    i(e - 1) && (e = Math.sqrt(e));
                    var s = t[2] * t[2] + t[3] * t[3];
                    i(s - 1) && (s = Math.sqrt(s)),
                    n[0] = t[4],
                    n[1] = t[5],
                    r[0] = e,
                    r[1] = s,
                    r[2] = r[3] = 0,
                    o[0] = Math.atan2( - t[1] / s, t[0] / e),
                    o[1] = o[2] = 0
                }
            },
            transformCoordToLocal: function(t, e) {
                var i = [t, e];
                return this.needTransform && this.invTransform && r.applyTransform(i, i, this.invTransform),
                i
            }
        },
        l
    }),
    i("zrender/Handler", ["require", "./config", "./tool/env", "./tool/event", "./tool/util", "./tool/vector", "./tool/matrix", "./mixin/Eventful"],
    function(t) {
        "use strict";
        function e(t, e) {
            return function(i) {
                return t.call(e, i)
            }
        }
        function i(t, e) {
            return function(i, n, r) {
                return t.call(e, i, n, r)
            }
        }
        function n(t) {
            for (var i = p.length; i--;) {
                var n = p[i];
                t["_" + n + "Handler"] = e(f[n], t)
            }
        }
        function r(t, e, i) {
            if (this._draggingTarget && this._draggingTarget.id == t.id || t.isSilent()) return ! 1;
            var n = this._event;
            if (t.isCover(e, i)) {
                t.hoverable && this.storage.addHover(t);
                for (var r = t.parent; r;) {
                    if (r.clipShape && !r.clipShape.isCover(this._mouseX, this._mouseY)) return ! 1;
                    r = r.parent
                }
                return this._lastHover != t && (this._processOutShape(n), this._processDragLeave(n), this._lastHover = t, this._processDragEnter(n)),
                this._processOverShape(n),
                this._processDragOver(n),
                this._hasfound = 1,
                !0
            }
            return ! 1
        }
        var o = t("./config"),
        s = t("./tool/env"),
        a = t("./tool/event"),
        l = t("./tool/util"),
        h = t("./tool/vector"),
        c = t("./tool/matrix"),
        d = o.EVENT,
        u = t("./mixin/Eventful"),
        p = ["resize", "click", "dblclick", "mousewheel", "mousemove", "mouseout", "mouseup", "mousedown", "touchstart", "touchend", "touchmove"],
        f = {
            resize: function(t) {
                t = t || window.event,
                this._lastHover = null,
                this._isMouseDown = 0,
                this.dispatch(d.RESIZE, t)
            },
            click: function(t) {
                t = this._zrenderEventFixed(t);
                var e = this._lastHover; (e && e.clickable || !e) && this._clickThreshold < 5 && this._dispatchAgency(e, d.CLICK, t),
                this._mousemoveHandler(t)
            },
            dblclick: function(t) {
                t = t || window.event,
                t = this._zrenderEventFixed(t);
                var e = this._lastHover; (e && e.clickable || !e) && this._clickThreshold < 5 && this._dispatchAgency(e, d.DBLCLICK, t),
                this._mousemoveHandler(t)
            },
            mousewheel: function(t) {
                t = this._zrenderEventFixed(t);
                var e = t.wheelDelta || -t.detail,
                i = e > 0 ? 1.1 : 1 / 1.1,
                n = !1,
                r = this._mouseX,
                o = this._mouseY;
                this.painter.eachBuildinLayer(function(e) {
                    var s = e.position;
                    if (e.zoomable) {
                        e.__zoom = e.__zoom || 1;
                        var l = e.__zoom;
                        l *= i,
                        l = Math.max(Math.min(e.maxZoom, l), e.minZoom),
                        i = l / e.__zoom,
                        e.__zoom = l,
                        s[0] -= (r - s[0]) * (i - 1),
                        s[1] -= (o - s[1]) * (i - 1),
                        e.scale[0] *= i,
                        e.scale[1] *= i,
                        e.dirty = !0,
                        n = !0,
                        a.stop(t)
                    }
                }),
                n && this.painter.refresh(),
                this._dispatchAgency(this._lastHover, d.MOUSEWHEEL, t),
                this._mousemoveHandler(t)
            },
            mousemove: function(t) {
                if (!this.painter.isLoading()) {
                    t = this._zrenderEventFixed(t),
                    this._lastX = this._mouseX,
                    this._lastY = this._mouseY,
                    this._mouseX = a.getX(t),
                    this._mouseY = a.getY(t);
                    var e = this._mouseX - this._lastX,
                    i = this._mouseY - this._lastY;
                    this._processDragStart(t),
                    this._hasfound = 0,
                    this._event = t,
                    this._iterateAndFindHover(),
                    this._hasfound || ((!this._draggingTarget || this._lastHover && this._lastHover != this._draggingTarget) && (this._processOutShape(t), this._processDragLeave(t)), this._lastHover = null, this.storage.delHover(), this.painter.clearHover());
                    var n = "default";
                    if (this._draggingTarget) this.storage.drift(this._draggingTarget.id, e, i),
                    this._draggingTarget.modSelf(),
                    this.storage.addHover(this._draggingTarget),
                    this._clickThreshold++;
                    else if (this._isMouseDown) {
                        var r = !1;
                        this.painter.eachBuildinLayer(function(t) {
                            t.panable && (n = "move", t.position[0] += e, t.position[1] += i, r = !0, t.dirty = !0)
                        }),
                        r && this.painter.refresh()
                    }
                    this._draggingTarget || this._hasfound && this._lastHover.draggable ? n = "move": this._hasfound && this._lastHover.clickable && (n = "pointer"),
                    this.root.style.cursor = n,
                    this._dispatchAgency(this._lastHover, d.MOUSEMOVE, t),
                    (this._draggingTarget || this._hasfound || this.storage.hasHoverShape()) && this.painter.refreshHover()
                }
            },
            mouseout: function(t) {
                t = this._zrenderEventFixed(t);
                var e = t.toElement || t.relatedTarget;
                if (e != this.root) for (; e && 9 != e.nodeType;) {
                    if (e == this.root) return void this._mousemoveHandler(t);
                    e = e.parentNode
                }
                t.zrenderX = this._lastX,
                t.zrenderY = this._lastY,
                this.root.style.cursor = "default",
                this._isMouseDown = 0,
                this._processOutShape(t),
                this._processDrop(t),
                this._processDragEnd(t),
                this.painter.isLoading() || this.painter.refreshHover(),
                this.dispatch(d.GLOBALOUT, t)
            },
            mousedown: function(t) {
                return this._clickThreshold = 0,
                2 == this._lastDownButton ? (this._lastDownButton = t.button, void(this._mouseDownTarget = null)) : (this._lastMouseDownMoment = new Date, t = this._zrenderEventFixed(t), this._isMouseDown = 1, this._mouseDownTarget = this._lastHover, this._dispatchAgency(this._lastHover, d.MOUSEDOWN, t), void(this._lastDownButton = t.button))
            },
            mouseup: function(t) {
                t = this._zrenderEventFixed(t),
                this.root.style.cursor = "default",
                this._isMouseDown = 0,
                this._mouseDownTarget = null,
                this._dispatchAgency(this._lastHover, d.MOUSEUP, t),
                this._processDrop(t),
                this._processDragEnd(t)
            },
            touchstart: function(t) {
                t = this._zrenderEventFixed(t, !0),
                this._lastTouchMoment = new Date,
                this._mobileFindFixed(t),
                this._mousedownHandler(t)
            },
            touchmove: function(t) {
                t = this._zrenderEventFixed(t, !0),
                this._mousemoveHandler(t),
                this._isDragging && a.stop(t)
            },
            touchend: function(t) {
                t = this._zrenderEventFixed(t, !0),
                this._mouseupHandler(t);
                var e = new Date;
                e - this._lastTouchMoment < d.touchClickDelay && (this._mobileFindFixed(t), this._clickHandler(t), e - this._lastClickMoment < d.touchClickDelay / 2 && (this._dblclickHandler(t), this._lastHover && this._lastHover.clickable && a.stop(t)), this._lastClickMoment = e),
                this.painter.clearHover()
            }
        },
        g = function(t, e, o) {
            u.call(this),
            this.root = t,
            this.storage = e,
            this.painter = o,
            this._lastX = this._lastY = this._mouseX = this._mouseY = 0,
            this._findHover = i(r, this),
            this._domHover = o.getDomHover(),
            n(this),
            window.addEventListener ? (window.addEventListener("resize", this._resizeHandler), s.os.tablet || s.os.phone ? (t.addEventListener("touchstart", this._touchstartHandler), t.addEventListener("touchmove", this._touchmoveHandler), t.addEventListener("touchend", this._touchendHandler)) : (t.addEventListener("click", this._clickHandler), t.addEventListener("dblclick", this._dblclickHandler), t.addEventListener("mousewheel", this._mousewheelHandler), t.addEventListener("mousemove", this._mousemoveHandler), t.addEventListener("mousedown", this._mousedownHandler), t.addEventListener("mouseup", this._mouseupHandler)), t.addEventListener("DOMMouseScroll", this._mousewheelHandler), t.addEventListener("mouseout", this._mouseoutHandler)) : (window.attachEvent("onresize", this._resizeHandler), t.attachEvent("onclick", this._clickHandler), t.ondblclick = this._dblclickHandler, t.attachEvent("onmousewheel", this._mousewheelHandler), t.attachEvent("onmousemove", this._mousemoveHandler), t.attachEvent("onmouseout", this._mouseoutHandler), t.attachEvent("onmousedown", this._mousedownHandler), t.attachEvent("onmouseup", this._mouseupHandler))
        };
        g.prototype.on = function(t, e, i) {
            return this.bind(t, e, i),
            this
        },
        g.prototype.un = function(t, e) {
            return this.unbind(t, e),
            this
        },
        g.prototype.trigger = function(t, e) {
            switch (t) {
            case d.RESIZE:
            case d.CLICK:
            case d.DBLCLICK:
            case d.MOUSEWHEEL:
            case d.MOUSEMOVE:
            case d.MOUSEDOWN:
            case d.MOUSEUP:
            case d.MOUSEOUT:
                this["_" + t + "Handler"](e)
            }
        },
        g.prototype.dispose = function() {
            var t = this.root;
            window.removeEventListener ? (window.removeEventListener("resize", this._resizeHandler), s.os.tablet || s.os.phone ? (t.removeEventListener("touchstart", this._touchstartHandler), t.removeEventListener("touchmove", this._touchmoveHandler), t.removeEventListener("touchend", this._touchendHandler)) : (t.removeEventListener("click", this._clickHandler), t.removeEventListener("dblclick", this._dblclickHandler), t.removeEventListener("mousewheel", this._mousewheelHandler), t.removeEventListener("mousemove", this._mousemoveHandler), t.removeEventListener("mousedown", this._mousedownHandler), t.removeEventListener("mouseup", this._mouseupHandler)), t.removeEventListener("DOMMouseScroll", this._mousewheelHandler), t.removeEventListener("mouseout", this._mouseoutHandler)) : (window.detachEvent("onresize", this._resizeHandler), t.detachEvent("onclick", this._clickHandler), t.detachEvent("dblclick", this._dblclickHandler), t.detachEvent("onmousewheel", this._mousewheelHandler), t.detachEvent("onmousemove", this._mousemoveHandler), t.detachEvent("onmouseout", this._mouseoutHandler), t.detachEvent("onmousedown", this._mousedownHandler), t.detachEvent("onmouseup", this._mouseupHandler)),
            this.root = this._domHover = this.storage = this.painter = null,
            this.un()
        },
        g.prototype._processDragStart = function(t) {
            var e = this._lastHover;
            if (this._isMouseDown && e && e.draggable && !this._draggingTarget && this._mouseDownTarget == e) {
                if (e.dragEnableTime && new Date - this._lastMouseDownMoment < e.dragEnableTime) return;
                var i = e;
                this._draggingTarget = i,
                this._isDragging = 1,
                i.invisible = !0,
                this.storage.mod(i.id),
                this._dispatchAgency(i, d.DRAGSTART, t),
                this.painter.refresh()
            }
        },
        g.prototype._processDragEnter = function(t) {
            this._draggingTarget && this._dispatchAgency(this._lastHover, d.DRAGENTER, t, this._draggingTarget)
        },
        g.prototype._processDragOver = function(t) {
            this._draggingTarget && this._dispatchAgency(this._lastHover, d.DRAGOVER, t, this._draggingTarget)
        },
        g.prototype._processDragLeave = function(t) {
            this._draggingTarget && this._dispatchAgency(this._lastHover, d.DRAGLEAVE, t, this._draggingTarget)
        },
        g.prototype._processDrop = function(t) {
            this._draggingTarget && (this._draggingTarget.invisible = !1, this.storage.mod(this._draggingTarget.id), this.painter.refresh(), this._dispatchAgency(this._lastHover, d.DROP, t, this._draggingTarget))
        },
        g.prototype._processDragEnd = function(t) {
            this._draggingTarget && (this._dispatchAgency(this._draggingTarget, d.DRAGEND, t), this._lastHover = null),
            this._isDragging = 0,
            this._draggingTarget = null
        },
        g.prototype._processOverShape = function(t) {
            this._dispatchAgency(this._lastHover, d.MOUSEOVER, t)
        },
        g.prototype._processOutShape = function(t) {
            this._dispatchAgency(this._lastHover, d.MOUSEOUT, t)
        },
        g.prototype._dispatchAgency = function(t, e, i, n) {
            var r = "on" + e,
            o = {
                type: e,
                event: i,
                target: t,
                cancelBubble: !1
            },
            s = t;
            for (n && (o.dragged = n); s && (s[r] && (o.cancelBubble = s[r](o)), s.dispatch(e, o), s = s.parent, !o.cancelBubble););
            if (t) o.cancelBubble || this.dispatch(e, o);
            else if (!n) {
                var a = {
                    type: e,
                    event: i
                };
                this.dispatch(e, a),
                this.painter.eachOtherLayer(function(t) {
                    "function" == typeof t[r] && t[r](a),
                    t.dispatch && t.dispatch(e, a)
                })
            }
        },
        g.prototype._iterateAndFindHover = function() {
            var t = c.create();
            return function() {
                for (var e, i, n = this.storage.getShapeList(), r = [0, 0], o = n.length - 1; o >= 0; o--) {
                    var s = n[o];
                    if (e !== s.zlevel && (i = this.painter.getLayer(s.zlevel, i), r[0] = this._mouseX, r[1] = this._mouseY, i.needTransform && (c.invert(t, i.transform), h.applyTransform(r, r, t))), this._findHover(s, r[0], r[1])) break
                }
            }
        } ();
        var m = [{
            x: 10
        },
        {
            x: -20
        },
        {
            x: 10,
            y: 10
        },
        {
            y: -20
        }];
        return g.prototype._mobileFindFixed = function(t) {
            this._lastHover = null,
            this._mouseX = t.zrenderX,
            this._mouseY = t.zrenderY,
            this._event = t,
            this._iterateAndFindHover();
            for (var e = 0; ! this._lastHover && e < m.length; e++) {
                var i = m[e];
                i.x && (this._mouseX += i.x),
                i.y && (this._mouseY += i.y),
                this._iterateAndFindHover()
            }
            this._lastHover && (t.zrenderX = this._mouseX, t.zrenderY = this._mouseY)
        },
        g.prototype._zrenderEventFixed = function(t, e) {
            if (t.zrenderFixed) return t;
            if (e) {
                var i = "touchend" != t.type ? t.targetTouches[0] : t.changedTouches[0];
                if (i) {
                    var n = this.painter._domRoot.getBoundingClientRect();
                    t.zrenderX = i.clientX - n.left,
                    t.zrenderY = i.clientY - n.top
                }
            } else {
                t = t || window.event;
                var r = t.toElement || t.relatedTarget || t.srcElement || t.target;
                r && r != this._domHover && (t.zrenderX = ("undefined" != typeof t.offsetX ? t.offsetX: t.layerX) + r.offsetLeft, t.zrenderY = ("undefined" != typeof t.offsetY ? t.offsetY: t.layerY) + r.offsetTop)
            }
            return t.zrenderFixed = 1,
            t
        },
        l.merge(g.prototype, u.prototype, !0),
        g
    }),
    i("zrender/Painter", ["require", "./config", "./tool/util", "./tool/log", "./loadingEffect/Base", "./Layer", "./shape/Image"],
    function(t) {
        "use strict";
        function e() {
            return ! 1
        }
        function i() {}
        function n(t) {
            return t ? t.isBuildin ? !0 : "function" != typeof t.resize || "function" != typeof t.refresh ? !1 : !0 : !1
        }
        var r = t("./config"),
        o = t("./tool/util"),
        s = t("./tool/log"),
        a = t("./loadingEffect/Base"),
        l = t("./Layer"),
        h = function(t, i) {
            this.root = t,
            t.style["-webkit-tap-highlight-color"] = "transparent",
            t.style["-webkit-user-select"] = "none",
            t.style["user-select"] = "none",
            t.style["-webkit-touch-callout"] = "none",
            this.storage = i,
            t.innerHTML = "",
            this._width = this._getWidth(),
            this._height = this._getHeight();
            var n = document.createElement("div");
            this._domRoot = n,
            n.style.position = "relative",
            n.style.overflow = "hidden",
            n.style.width = this._width + "px",
            n.style.height = this._height + "px",
            t.appendChild(n),
            this._layers = {},
            this._zlevelList = [],
            this._layerConfig = {},
            this._loadingEffect = new a({}),
            this.shapeToImage = this._createShapeToImageProcessor(),
            this._bgDom = document.createElement("div"),
            this._bgDom.style.cssText = ["position:absolute;left:0px;top:0px;width:", this._width, "px;height:", this._height + "px;", "-webkit-user-select:none;user-select;none;", "-webkit-touch-callout:none;"].join(""),
            this._bgDom.setAttribute("data-zr-dom-id", "bg"),
            n.appendChild(this._bgDom),
            this._bgDom.onselectstart = e;
            var r = new l("_zrender_hover_", this);
            this._layers.hover = r,
            n.appendChild(r.dom),
            r.initContext(),
            r.dom.onselectstart = e,
            r.dom.style["-webkit-user-select"] = "none",
            r.dom.style["user-select"] = "none",
            r.dom.style["-webkit-touch-callout"] = "none",
            this.refreshNextFrame = null
        };
        return h.prototype.render = function(t) {
            return this.isLoading() && this.hideLoading(),
            this.refresh(t, !0),
            this
        },
        h.prototype.refresh = function(t, e) {
            var i = this.storage.getShapeList(!0);
            this._paintList(i, e);
            for (var n = 0; n < this._zlevelList.length; n++) {
                var r = this._zlevelList[n],
                o = this._layers[r]; ! o.isBuildin && o.refresh && o.refresh()
            }
            return "function" == typeof t && t(),
            this
        },
        h.prototype._preProcessLayer = function(t) {
            t.unusedCount++,
            t.updateTransform()
        },
        h.prototype._postProcessLayer = function(t) {
            t.dirty = !1,
            1 == t.unusedCount && t.clear()
        },
        h.prototype._paintList = function(t, e) {
            "undefined" == typeof e && (e = !1),
            this._updateLayerStatus(t);
            var i, n, o;
            this.eachBuildinLayer(this._preProcessLayer);
            for (var a = 0,
            l = t.length; l > a; a++) {
                var h = t[a];
                if (n !== h.zlevel && (i && (i.needTransform && o.restore(), o.flush && o.flush()), n = h.zlevel, i = this.getLayer(n), i.isBuildin || s("ZLevel " + n + " has been used by unkown layer " + i.id), o = i.ctx, i.unusedCount = 0, (i.dirty || e) && i.clear(), i.needTransform && (o.save(), i.setTransform(o))), (i.dirty || e) && !h.invisible && (!h.onbrush || h.onbrush && !h.onbrush(o, !1))) if (r.catchBrushException) try {
                    h.brush(o, !1, this.refreshNextFrame)
                } catch(c) {
                    s(c, "brush error of " + h.type, h)
                } else h.brush(o, !1, this.refreshNextFrame);
                h.__dirty = !1
            }
            i && (i.needTransform && o.restore(), o.flush && o.flush()),
            this.eachBuildinLayer(this._postProcessLayer)
        },
        h.prototype.getLayer = function(t) {
            var e = this._layers[t];
            return e || (e = new l(t, this), e.isBuildin = !0, this._layerConfig[t] && o.merge(e, this._layerConfig[t], !0), e.updateTransform(), this.insertLayer(t, e), e.initContext()),
            e
        },
        h.prototype.insertLayer = function(t, e) {
            if (this._layers[t]) return void s("ZLevel " + t + " has been used already");
            if (!n(e)) return void s("Layer of zlevel " + t + " is not valid");
            var i = this._zlevelList.length,
            r = null,
            o = -1;
            if (i > 0 && t > this._zlevelList[0]) {
                for (o = 0; i - 1 > o && !(this._zlevelList[o] < t && this._zlevelList[o + 1] > t); o++);
                r = this._layers[this._zlevelList[o]]
            }
            this._zlevelList.splice(o + 1, 0, t);
            var a = r ? r.dom: this._bgDom;
            a.nextSibling ? a.parentNode.insertBefore(e.dom, a.nextSibling) : a.parentNode.appendChild(e.dom),
            this._layers[t] = e
        },
        h.prototype.eachLayer = function(t, e) {
            for (var i = 0; i < this._zlevelList.length; i++) {
                var n = this._zlevelList[i];
                t.call(e, this._layers[n], n)
            }
        },
        h.prototype.eachBuildinLayer = function(t, e) {
            for (var i = 0; i < this._zlevelList.length; i++) {
                var n = this._zlevelList[i],
                r = this._layers[n];
                r.isBuildin && t.call(e, r, n)
            }
        },
        h.prototype.eachOtherLayer = function(t, e) {
            for (var i = 0; i < this._zlevelList.length; i++) {
                var n = this._zlevelList[i],
                r = this._layers[n];
                r.isBuildin || t.call(e, r, n)
            }
        },
        h.prototype.getLayers = function() {
            return this._layers
        },
        h.prototype._updateLayerStatus = function(t) {
            var e = this._layers,
            i = {};
            this.eachBuildinLayer(function(t, e) {
                i[e] = t.elCount,
                t.elCount = 0
            });
            for (var n = 0,
            r = t.length; r > n; n++) {
                var o = t[n],
                s = o.zlevel,
                a = e[s];
                if (a) {
                    if (a.elCount++, a.dirty) continue;
                    a.dirty = o.__dirty
                }
            }
            this.eachBuildinLayer(function(t, e) {
                i[e] !== t.elCount && (t.dirty = !0)
            })
        },
        h.prototype.refreshShapes = function(t, e) {
            for (var i = 0,
            n = t.length; n > i; i++) {
                var r = t[i];
                r.modSelf()
            }
            return this.refresh(e),
            this
        },
        h.prototype.setLoadingEffect = function(t) {
            return this._loadingEffect = t,
            this
        },
        h.prototype.clear = function() {
            return this.eachBuildinLayer(this._clearLayer),
            this
        },
        h.prototype._clearLayer = function(t) {
            t.clear()
        },
        h.prototype.modLayer = function(t, e) {
            if (e) {
                this._layerConfig[t] ? o.merge(this._layerConfig[t], e, !0) : this._layerConfig[t] = e;
                var i = this._layers[t];
                i && o.merge(i, this._layerConfig[t], !0)
            }
        },
        h.prototype.delLayer = function(t) {
            var e = this._layers[t];
            e && (this.modLayer(t, {
                position: e.position,
                rotation: e.rotation,
                scale: e.scale
            }), e.dom.parentNode.removeChild(e.dom), delete this._layers[t], this._zlevelList.splice(o.indexOf(this._zlevelList, t), 1))
        },
        h.prototype.refreshHover = function() {
            this.clearHover();
            for (var t = this.storage.getHoverShapes(!0), e = 0, i = t.length; i > e; e++) this._brushHover(t[e]);
            var n = this._layers.hover.ctx;
            return n.flush && n.flush(),
            this.storage.delHover(),
            this
        },
        h.prototype.clearHover = function() {
            var t = this._layers.hover;
            return t && t.clear(),
            this
        },
        h.prototype.showLoading = function(t) {
            return this._loadingEffect && this._loadingEffect.stop(),
            t && this.setLoadingEffect(t),
            this._loadingEffect.start(this),
            this.loading = !0,
            this
        },
        h.prototype.hideLoading = function() {
            return this._loadingEffect.stop(),
            this.clearHover(),
            this.loading = !1,
            this
        },
        h.prototype.isLoading = function() {
            return this.loading
        },
        h.prototype.resize = function() {
            var t = this._domRoot;
            t.style.display = "none";
            var e = this._getWidth(),
            i = this._getHeight();
            if (t.style.display = "", this._width != e || i != this._height) {
                this._width = e,
                this._height = i,
                t.style.width = e + "px",
                t.style.height = i + "px";
                for (var n in this._layers) this._layers[n].resize(e, i);
                this.refresh(null, !0)
            }
            return this
        },
        h.prototype.clearLayer = function(t) {
            var e = this._layers[t];
            e && e.clear()
        },
        h.prototype.dispose = function() {
            this.isLoading() && this.hideLoading(),
            this.root.innerHTML = "",
            this.root = this.storage = this._domRoot = this._layers = null
        },
        h.prototype.getDomHover = function() {
            return this._layers.hover.dom
        },
        h.prototype.toDataURL = function(t, e, i) {
            if (window.G_vmlCanvasManager) return null;
            var n = new l("image", this);
            this._bgDom.appendChild(n.dom),
            n.initContext();
            var o = n.ctx;
            n.clearColor = e || "#fff",
            n.clear();
            var a = this;
            this.storage.iterShape(function(t) {
                if (!t.invisible && (!t.onbrush || t.onbrush && !t.onbrush(o, !1))) if (r.catchBrushException) try {
                    t.brush(o, !1, a.refreshNextFrame)
                } catch(e) {
                    s(e, "brush error of " + t.type, t)
                } else t.brush(o, !1, a.refreshNextFrame)
            },
            {
                normal: "up",
                update: !0
            });
            var h = n.dom.toDataURL(t, i);
            return o = null,
            this._bgDom.removeChild(n.dom),
            h
        },
        h.prototype.getWidth = function() {
            return this._width
        },
        h.prototype.getHeight = function() {
            return this._height
        },
        h.prototype._getWidth = function() {
            var t = this.root,
            e = t.currentStyle || document.defaultView.getComputedStyle(t);
            return ((t.clientWidth || parseInt(e.width, 10)) - parseInt(e.paddingLeft, 10) - parseInt(e.paddingRight, 10)).toFixed(0) - 0
        },
        h.prototype._getHeight = function() {
            var t = this.root,
            e = t.currentStyle || document.defaultView.getComputedStyle(t);
            return ((t.clientHeight || parseInt(e.height, 10)) - parseInt(e.paddingTop, 10) - parseInt(e.paddingBottom, 10)).toFixed(0) - 0
        },
        h.prototype._brushHover = function(t) {
            var e = this._layers.hover.ctx;
            if (!t.onbrush || t.onbrush && !t.onbrush(e, !0)) {
                var i = this.getLayer(t.zlevel);
                if (i.needTransform && (e.save(), i.setTransform(e)), r.catchBrushException) try {
                    t.brush(e, !0, this.refreshNextFrame)
                } catch(n) {
                    s(n, "hoverBrush error of " + t.type, t)
                } else t.brush(e, !0, this.refreshNextFrame);
                i.needTransform && e.restore()
            }
        },
        h.prototype._shapeToImage = function(e, i, n, r, o) {
            var s = document.createElement("canvas"),
            a = s.getContext("2d");
            s.style.width = n + "px",
            s.style.height = r + "px",
            s.setAttribute("width", n * o),
            s.setAttribute("height", r * o),
            a.clearRect(0, 0, n * o, r * o);
            var l = {
                position: i.position,
                rotation: i.rotation,
                scale: i.scale
            };
            i.position = [0, 0, 0],
            i.rotation = 0,
            i.scale = [1, 1],
            i && i.brush(a, !1);
            var h = t("./shape/Image"),
            c = new h({
                id: e,
                style: {
                    x: 0,
                    y: 0,
                    image: s
                }
            });
            return null != l.position && (c.position = i.position = l.position),
            null != l.rotation && (c.rotation = i.rotation = l.rotation),
            null != l.scale && (c.scale = i.scale = l.scale),
            c
        },
        h.prototype._createShapeToImageProcessor = function() {
            if (window.G_vmlCanvasManager) return i;
            var t = this;
            return function(e, i, n, o) {
                return t._shapeToImage(e, i, n, o, r.devicePixelRatio)
            }
        },
        h
    }),
    i("zrender/Storage", ["require", "./tool/util", "./Group"],
    function(t) {
        "use strict";
        function e(t, e) {
            return t.zlevel == e.zlevel ? t.z == e.z ? t.__renderidx - e.__renderidx: t.z - e.z: t.zlevel - e.zlevel
        }
        var i = t("./tool/util"),
        n = t("./Group"),
        r = {
            hover: !1,
            normal: "down",
            update: !1
        },
        o = function() {
            this._elements = {},
            this._hoverElements = [],
            this._roots = [],
            this._shapeList = [],
            this._shapeListOffset = 0
        };
        return o.prototype.iterShape = function(t, e) {
            if (e || (e = r), e.hover) for (var i = 0,
            n = this._hoverElements.length; n > i; i++) {
                var o = this._hoverElements[i];
                if (o.updateTransform(), t(o)) return this
            }
            switch (e.update && this.updateShapeList(), e.normal) {
            case "down":
                for (var n = this._shapeList.length; n--;) if (t(this._shapeList[n])) return this;
                break;
            default:
                for (var i = 0,
                n = this._shapeList.length; n > i; i++) if (t(this._shapeList[i])) return this
            }
            return this
        },
        o.prototype.getHoverShapes = function(t) {
            for (var i = [], n = 0, r = this._hoverElements.length; r > n; n++) {
                i.push(this._hoverElements[n]);
                var o = this._hoverElements[n].hoverConnect;
                if (o) {
                    var s;
                    o = o instanceof Array ? o: [o];
                    for (var a = 0,
                    l = o.length; l > a; a++) s = o[a].id ? o[a] : this.get(o[a]),
                    s && i.push(s)
                }
            }
            if (i.sort(e), t) for (var n = 0,
            r = i.length; r > n; n++) i[n].updateTransform();
            return i
        },
        o.prototype.getShapeList = function(t) {
            return t && this.updateShapeList(),
            this._shapeList
        },
        o.prototype.updateShapeList = function() {
            this._shapeListOffset = 0;
            for (var t = 0,
            i = this._roots.length; i > t; t++) {
                var n = this._roots[t];
                this._updateAndAddShape(n)
            }
            this._shapeList.length = this._shapeListOffset;
            for (var t = 0,
            i = this._shapeList.length; i > t; t++) this._shapeList[t].__renderidx = t;
            this._shapeList.sort(e)
        },
        o.prototype._updateAndAddShape = function(t, e) {
            if (!t.ignore) if (t.updateTransform(), "group" == t.type) {
                t.clipShape && (t.clipShape.parent = t, t.clipShape.updateTransform(), e ? (e = e.slice(), e.push(t.clipShape)) : e = [t.clipShape]);
                for (var i = 0; i < t._children.length; i++) {
                    var n = t._children[i];
                    n.__dirty = t.__dirty || n.__dirty,
                    this._updateAndAddShape(n, e)
                }
                t.__dirty = !1
            } else t.__clipShapes = e,
            this._shapeList[this._shapeListOffset++] = t
        },
        o.prototype.mod = function(t, e) {
            if ("string" == typeof t && (t = this._elements[t]), t && (t.modSelf(), e)) if (e.parent || e._storage || e.__clipShapes) {
                var n = {};
                for (var r in e)"parent" !== r && "_storage" !== r && "__clipShapes" !== r && e.hasOwnProperty(r) && (n[r] = e[r]);
                i.merge(t, n, !0)
            } else i.merge(t, e, !0);
            return this
        },
        o.prototype.drift = function(t, e, i) {
            var n = this._elements[t];
            return n && (n.needTransform = !0, "horizontal" === n.draggable ? i = 0 : "vertical" === n.draggable && (e = 0), (!n.ondrift || n.ondrift && !n.ondrift(e, i)) && n.drift(e, i)),
            this
        },
        o.prototype.addHover = function(t) {
            return t.updateNeedTransform(),
            this._hoverElements.push(t),
            this
        },
        o.prototype.delHover = function() {
            return this._hoverElements = [],
            this
        },
        o.prototype.hasHoverShape = function() {
            return this._hoverElements.length > 0
        },
        o.prototype.addRoot = function(t) {
            this._elements[t.id] || (t instanceof n && t.addChildrenToStorage(this), this.addToMap(t), this._roots.push(t))
        },
        o.prototype.delRoot = function(t) {
            if ("undefined" == typeof t) {
                for (var e = 0; e < this._roots.length; e++) {
                    var r = this._roots[e];
                    r instanceof n && r.delChildrenFromStorage(this)
                }
                return this._elements = {},
                this._hoverElements = [],
                this._roots = [],
                this._shapeList = [],
                void(this._shapeListOffset = 0)
            }
            if (t instanceof Array) for (var e = 0,
            o = t.length; o > e; e++) this.delRoot(t[e]);
            else {
                var s;
                s = "string" == typeof t ? this._elements[t] : t;
                var a = i.indexOf(this._roots, s);
                a >= 0 && (this.delFromMap(s.id), this._roots.splice(a, 1), s instanceof n && s.delChildrenFromStorage(this))
            }
        },
        o.prototype.addToMap = function(t) {
            return t instanceof n && (t._storage = this),
            t.modSelf(),
            this._elements[t.id] = t,
            this
        },
        o.prototype.get = function(t) {
            return this._elements[t]
        },
        o.prototype.delFromMap = function(t) {
            var e = this._elements[t];
            return e && (delete this._elements[t], e instanceof n && (e._storage = null)),
            this
        },
        o.prototype.dispose = function() {
            this._elements = this._renderList = this._roots = this._hoverElements = null
        },
        o
    }),
    i("zrender/animation/Animation", ["require", "./Clip", "../tool/color", "../tool/util", "../tool/event"],
    function(t) {
        "use strict";
        function e(t, e) {
            return t[e]
        }
        function i(t, e, i) {
            t[e] = i
        }
        function n(t, e, i) {
            return (e - t) * i + t
        }
        function r(t, e, i, r, o) {
            var s = t.length;
            if (1 == o) for (var a = 0; s > a; a++) r[a] = n(t[a], e[a], i);
            else for (var l = t[0].length, a = 0; s > a; a++) for (var h = 0; l > h; h++) r[a][h] = n(t[a][h], e[a][h], i)
        }
        function o(t) {
            switch (typeof t) {
            case "undefined":
            case "string":
                return ! 1
            }
            return "undefined" != typeof t.length
        }
        function s(t, e, i, n, r, o, s, l, h) {
            var c = t.length;
            if (1 == h) for (var d = 0; c > d; d++) l[d] = a(t[d], e[d], i[d], n[d], r, o, s);
            else for (var u = t[0].length, d = 0; c > d; d++) for (var p = 0; u > p; p++) l[d][p] = a(t[d][p], e[d][p], i[d][p], n[d][p], r, o, s)
        }
        function a(t, e, i, n, r, o, s) {
            var a = .5 * (i - t),
            l = .5 * (n - e);
            return (2 * (e - i) + a + l) * s + ( - 3 * (e - i) - 2 * a - l) * o + a * r + e
        }
        function l(t) {
            if (o(t)) {
                var e = t.length;
                if (o(t[0])) {
                    for (var i = [], n = 0; e > n; n++) i.push(g.call(t[n]));
                    return i
                }
                return g.call(t)
            }
            return t
        }
        function h(t) {
            return t[0] = Math.floor(t[0]),
            t[1] = Math.floor(t[1]),
            t[2] = Math.floor(t[2]),
            "rgba(" + t.join(",") + ")"
        }
        var c = t("./Clip"),
        d = t("../tool/color"),
        u = t("../tool/util"),
        p = t("../tool/event").Dispatcher,
        f = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function(t) {
            setTimeout(t, 16)
        },
        g = Array.prototype.slice,
        m = function(t) {
            t = t || {},
            this.stage = t.stage || {},
            this.onframe = t.onframe ||
            function() {},
            this._clips = [],
            this._running = !1,
            this._time = 0,
            p.call(this)
        };
        m.prototype = {
            add: function(t) {
                this._clips.push(t)
            },
            remove: function(t) {
                var e = u.indexOf(this._clips, t);
                e >= 0 && this._clips.splice(e, 1)
            },
            _update: function() {
                for (var t = (new Date).getTime(), e = t - this._time, i = this._clips, n = i.length, r = [], o = [], s = 0; n > s; s++) {
                    var a = i[s],
                    l = a.step(t);
                    l && (r.push(l), o.push(a))
                }
                for (var s = 0; n > s;) i[s]._needsRemove ? (i[s] = i[n - 1], i.pop(), n--) : s++;
                n = r.length;
                for (var s = 0; n > s; s++) o[s].fire(r[s]);
                this._time = t,
                this.onframe(e),
                this.dispatch("frame", e),
                this.stage.update && this.stage.update()
            },
            start: function() {
                function t() {
                    e._running && (f(t), e._update())
                }
                var e = this;
                this._running = !0,
                this._time = (new Date).getTime(),
                f(t)
            },
            stop: function() {
                this._running = !1
            },
            clear: function() {
                this._clips = []
            },
            animate: function(t, e) {
                e = e || {};
                var i = new _(t, e.loop, e.getter, e.setter);
                return i.animation = this,
                i
            },
            constructor: m
        },
        u.merge(m.prototype, p.prototype, !0);
        var _ = function(t, n, r, o) {
            this._tracks = {},
            this._target = t,
            this._loop = n || !1,
            this._getter = r || e,
            this._setter = o || i,
            this._clipCount = 0,
            this._delay = 0,
            this._doneList = [],
            this._onframeList = [],
            this._clipList = []
        };
        return _.prototype = {
            when: function(t, e) {
                for (var i in e) this._tracks[i] || (this._tracks[i] = [], 0 !== t && this._tracks[i].push({
                    time: 0,
                    value: l(this._getter(this._target, i))
                })),
                this._tracks[i].push({
                    time: parseInt(t, 10),
                    value: e[i]
                });
                return this
            },
            during: function(t) {
                return this._onframeList.push(t),
                this
            },
            start: function(t) {
                var e = this,
                i = this._setter,
                l = this._getter,
                u = "spline" === t,
                p = function() {
                    if (e._clipCount--, 0 === e._clipCount) {
                        e._tracks = {};
                        for (var t = e._doneList.length,
                        i = 0; t > i; i++) e._doneList[i].call(e)
                    }
                },
                f = function(f, g) {
                    var m = f.length;
                    if (m) {
                        var _ = f[0].value,
                        y = o(_),
                        v = !1,
                        b = y && o(_[0]) ? 2 : 1;
                        f.sort(function(t, e) {
                            return t.time - e.time
                        });
                        var x;
                        if (m) {
                            x = f[m - 1].time;
                            for (var T = [], w = [], S = 0; m > S; S++) {
                                T.push(f[S].time / x);
                                var C = f[S].value;
                                "string" == typeof C && (C = d.toArray(C), 0 === C.length && (C[0] = C[1] = C[2] = 0, C[3] = 1), v = !0),
                                w.push(C)
                            }
                            var k, S, E, z, L, M, A, P = 0,
                            I = 0;
                            if (v) var R = [0, 0, 0, 0];
                            var O = function(t, o) {
                                if (I > o) {
                                    for (k = Math.min(P + 1, m - 1), S = k; S >= 0 && !(T[S] <= o); S--);
                                    S = Math.min(S, m - 2)
                                } else {
                                    for (S = P; m > S && !(T[S] > o); S++);
                                    S = Math.min(S - 1, m - 2)
                                }
                                P = S,
                                I = o;
                                var c = T[S + 1] - T[S];
                                if (0 !== c) {
                                    if (E = (o - T[S]) / c, u) if (L = w[S], z = w[0 === S ? S: S - 1], M = w[S > m - 2 ? m - 1 : S + 1], A = w[S > m - 3 ? m - 1 : S + 2], y) s(z, L, M, A, E, E * E, E * E * E, l(t, g), b);
                                    else {
                                        var d;
                                        v ? (d = s(z, L, M, A, E, E * E, E * E * E, R, 1), d = h(R)) : d = a(z, L, M, A, E, E * E, E * E * E),
                                        i(t, g, d)
                                    } else if (y) r(w[S], w[S + 1], E, l(t, g), b);
                                    else {
                                        var d;
                                        v ? (r(w[S], w[S + 1], E, R, 1), d = h(R)) : d = n(w[S], w[S + 1], E),
                                        i(t, g, d)
                                    }
                                    for (S = 0; S < e._onframeList.length; S++) e._onframeList[S](t, o)
                                }
                            },
                            D = new c({
                                target: e._target,
                                life: x,
                                loop: e._loop,
                                delay: e._delay,
                                onframe: O,
                                ondestroy: p
                            });
                            t && "spline" !== t && (D.easing = t),
                            e._clipList.push(D),
                            e._clipCount++,
                            e.animation.add(D)
                        }
                    }
                };
                for (var g in this._tracks) f(this._tracks[g], g);
                return this
            },
            stop: function() {
                for (var t = 0; t < this._clipList.length; t++) {
                    var e = this._clipList[t];
                    this.animation.remove(e)
                }
                this._clipList = []
            },
            delay: function(t) {
                return this._delay = t,
                this
            },
            done: function(t) {
                return t && this._doneList.push(t),
                this
            }
        },
        m
    }),
    i("zrender/tool/vector", [],
    function() {
        var t = "undefined" == typeof Float32Array ? Array: Float32Array,
        e = {
            create: function(e, i) {
                var n = new t(2);
                return n[0] = e || 0,
                n[1] = i || 0,
                n
            },
            copy: function(t, e) {
                return t[0] = e[0],
                t[1] = e[1],
                t
            },
            clone: function(e) {
                var i = new t(2);
                return i[0] = e[0],
                i[1] = e[1],
                i
            },
            set: function(t, e, i) {
                return t[0] = e,
                t[1] = i,
                t
            },
            add: function(t, e, i) {
                return t[0] = e[0] + i[0],
                t[1] = e[1] + i[1],
                t
            },
            scaleAndAdd: function(t, e, i, n) {
                return t[0] = e[0] + i[0] * n,
                t[1] = e[1] + i[1] * n,
                t
            },
            sub: function(t, e, i) {
                return t[0] = e[0] - i[0],
                t[1] = e[1] - i[1],
                t
            },
            len: function(t) {
                return Math.sqrt(this.lenSquare(t))
            },
            lenSquare: function(t) {
                return t[0] * t[0] + t[1] * t[1]
            },
            mul: function(t, e, i) {
                return t[0] = e[0] * i[0],
                t[1] = e[1] * i[1],
                t
            },
            div: function(t, e, i) {
                return t[0] = e[0] / i[0],
                t[1] = e[1] / i[1],
                t
            },
            dot: function(t, e) {
                return t[0] * e[0] + t[1] * e[1]
            },
            scale: function(t, e, i) {
                return t[0] = e[0] * i,
                t[1] = e[1] * i,
                t
            },
            normalize: function(t, i) {
                var n = e.len(i);
                return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = i[0] / n, t[1] = i[1] / n),
                t
            },
            distance: function(t, e) {
                return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
            },
            distanceSquare: function(t, e) {
                return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
            },
            negate: function(t, e) {
                return t[0] = -e[0],
                t[1] = -e[1],
                t
            },
            lerp: function(t, e, i, n) {
                return t[0] = e[0] + n * (i[0] - e[0]),
                t[1] = e[1] + n * (i[1] - e[1]),
                t
            },
            applyTransform: function(t, e, i) {
                var n = e[0],
                r = e[1];
                return t[0] = i[0] * n + i[2] * r + i[4],
                t[1] = i[1] * n + i[3] * r + i[5],
                t
            },
            min: function(t, e, i) {
                return t[0] = Math.min(e[0], i[0]),
                t[1] = Math.min(e[1], i[1]),
                t
            },
            max: function(t, e, i) {
                return t[0] = Math.max(e[0], i[0]),
                t[1] = Math.max(e[1], i[1]),
                t
            }
        };
        return e.length = e.len,
        e.lengthSquare = e.lenSquare,
        e.dist = e.distance,
        e.distSquare = e.distanceSquare,
        e
    }),
    i("zrender/tool/curve", ["require", "./vector"],
    function(t) {
        function e(t) {
            return t > -m && m > t
        }
        function i(t) {
            return t > m || -m > t
        }
        function n(t, e, i, n, r) {
            var o = 1 - r;
            return o * o * (o * t + 3 * r * e) + r * r * (r * n + 3 * o * i)
        }
        function r(t, e, i, n, r) {
            var o = 1 - r;
            return 3 * (((e - t) * o + 2 * (i - e) * r) * o + (n - i) * r * r)
        }
        function o(t, i, n, r, o, s) {
            var a = r + 3 * (i - n) - t,
            l = 3 * (n - 2 * i + t),
            h = 3 * (i - t),
            c = t - o,
            d = l * l - 3 * a * h,
            u = l * h - 9 * a * c,
            p = h * h - 3 * l * c,
            f = 0;
            if (e(d) && e(u)) if (e(l)) s[0] = 0;
            else {
                var g = -h / l;
                g >= 0 && 1 >= g && (s[f++] = g)
            } else {
                var m = u * u - 4 * d * p;
                if (e(m)) {
                    var v = u / d,
                    g = -l / a + v,
                    b = -v / 2;
                    g >= 0 && 1 >= g && (s[f++] = g),
                    b >= 0 && 1 >= b && (s[f++] = b)
                } else if (m > 0) {
                    var x = Math.sqrt(m),
                    T = d * l + 1.5 * a * ( - u + x),
                    w = d * l + 1.5 * a * ( - u - x);
                    T = 0 > T ? -Math.pow( - T, y) : Math.pow(T, y),
                    w = 0 > w ? -Math.pow( - w, y) : Math.pow(w, y);
                    var g = ( - l - (T + w)) / (3 * a);
                    g >= 0 && 1 >= g && (s[f++] = g)
                } else {
                    var S = (2 * d * l - 3 * a * u) / (2 * Math.sqrt(d * d * d)),
                    C = Math.acos(S) / 3,
                    k = Math.sqrt(d),
                    E = Math.cos(C),
                    g = ( - l - 2 * k * E) / (3 * a),
                    b = ( - l + k * (E + _ * Math.sin(C))) / (3 * a),
                    z = ( - l + k * (E - _ * Math.sin(C))) / (3 * a);
                    g >= 0 && 1 >= g && (s[f++] = g),
                    b >= 0 && 1 >= b && (s[f++] = b),
                    z >= 0 && 1 >= z && (s[f++] = z)
                }
            }
            return f
        }
        function s(t, n, r, o, s) {
            var a = 6 * r - 12 * n + 6 * t,
            l = 9 * n + 3 * o - 3 * t - 9 * r,
            h = 3 * n - 3 * t,
            c = 0;
            if (e(l)) {
                if (i(a)) {
                    var d = -h / a;
                    d >= 0 && 1 >= d && (s[c++] = d)
                }
            } else {
                var u = a * a - 4 * l * h;
                if (e(u)) s[0] = -a / (2 * l);
                else if (u > 0) {
                    var p = Math.sqrt(u),
                    d = ( - a + p) / (2 * l),
                    f = ( - a - p) / (2 * l);
                    d >= 0 && 1 >= d && (s[c++] = d),
                    f >= 0 && 1 >= f && (s[c++] = f)
                }
            }
            return c
        }
        function a(t, e, i, n, r, o) {
            var s = (e - t) * r + t,
            a = (i - e) * r + e,
            l = (n - i) * r + i,
            h = (a - s) * r + s,
            c = (l - a) * r + a,
            d = (c - h) * r + h;
            o[0] = t,
            o[1] = s,
            o[2] = h,
            o[3] = d,
            o[4] = d,
            o[5] = c,
            o[6] = l,
            o[7] = n
        }
        function l(t, e, i, r, o, s, a, l, h, c, d) {
            var u, p = .005,
            f = 1 / 0;
            v[0] = h,
            v[1] = c;
            for (var _ = 0; 1 > _; _ += .05) {
                b[0] = n(t, i, o, a, _),
                b[1] = n(e, r, s, l, _);
                var y = g.distSquare(v, b);
                f > y && (u = _, f = y)
            }
            f = 1 / 0;
            for (var T = 0; 32 > T && !(m > p); T++) {
                var w = u - p,
                S = u + p;
                b[0] = n(t, i, o, a, w),
                b[1] = n(e, r, s, l, w);
                var y = g.distSquare(b, v);
                if (w >= 0 && f > y) u = w,
                f = y;
                else {
                    x[0] = n(t, i, o, a, S),
                    x[1] = n(e, r, s, l, S);
                    var C = g.distSquare(x, v);
                    1 >= S && f > C ? (u = S, f = C) : p *= .5
                }
            }
            return d && (d[0] = n(t, i, o, a, u), d[1] = n(e, r, s, l, u)),
            Math.sqrt(f)
        }
        function h(t, e, i, n) {
            var r = 1 - n;
            return r * (r * t + 2 * n * e) + n * n * i
        }
        function c(t, e, i, n) {
            return 2 * ((1 - n) * (e - t) + n * (i - e))
        }
        function d(t, n, r, o, s) {
            var a = t - 2 * n + r,
            l = 2 * (n - t),
            h = t - o,
            c = 0;
            if (e(a)) {
                if (i(l)) {
                    var d = -h / l;
                    d >= 0 && 1 >= d && (s[c++] = d)
                }
            } else {
                var u = l * l - 4 * a * h;
                if (e(u)) {
                    var d = -l / (2 * a);
                    d >= 0 && 1 >= d && (s[c++] = d)
                } else if (u > 0) {
                    var p = Math.sqrt(u),
                    d = ( - l + p) / (2 * a),
                    f = ( - l - p) / (2 * a);
                    d >= 0 && 1 >= d && (s[c++] = d),
                    f >= 0 && 1 >= f && (s[c++] = f)
                }
            }
            return c
        }
        function u(t, e, i) {
            var n = t + i - 2 * e;
            return 0 === n ? .5 : (t - e) / n
        }
        function p(t, e, i, n, r) {
            var o = (e - t) * n + t,
            s = (i - e) * n + e,
            a = (s - o) * n + o;
            r[0] = t,
            r[1] = o,
            r[2] = a,
            r[3] = a,
            r[4] = s,
            r[5] = i
        }
        function f(t, e, i, n, r, o, s, a, l) {
            var c, d = .005,
            u = 1 / 0;
            v[0] = s,
            v[1] = a;
            for (var p = 0; 1 > p; p += .05) {
                b[0] = h(t, i, r, p),
                b[1] = h(e, n, o, p);
                var f = g.distSquare(v, b);
                u > f && (c = p, u = f)
            }
            u = 1 / 0;
            for (var _ = 0; 32 > _ && !(m > d); _++) {
                var y = c - d,
                T = c + d;
                b[0] = h(t, i, r, y),
                b[1] = h(e, n, o, y);
                var f = g.distSquare(b, v);
                if (y >= 0 && u > f) c = y,
                u = f;
                else {
                    x[0] = h(t, i, r, T),
                    x[1] = h(e, n, o, T);
                    var w = g.distSquare(x, v);
                    1 >= T && u > w ? (c = T, u = w) : d *= .5
                }
            }
            return l && (l[0] = h(t, i, r, c), l[1] = h(e, n, o, c)),
            Math.sqrt(u)
        }
        var g = t("./vector"),
        m = 1e-4,
        _ = Math.sqrt(3),
        y = 1 / 3,
        v = g.create(),
        b = g.create(),
        x = g.create();
        return {
            cubicAt: n,
            cubicDerivativeAt: r,
            cubicRootAt: o,
            cubicExtrema: s,
            cubicSubdivide: a,
            cubicProjectPoint: l,
            quadraticAt: h,
            quadraticDerivativeAt: c,
            quadraticRootAt: d,
            quadraticExtremum: u,
            quadraticSubdivide: p,
            quadraticProjectPoint: f
        }
    }),
    i("zrender/Layer", ["require", "./mixin/Transformable", "./tool/util", "./config"],
    function(t) {
        function e() {
            return ! 1
        }
        function i(t, e, i) {
            var n = document.createElement(e),
            r = i.getWidth(),
            o = i.getHeight();
            return n.style.position = "absolute",
            n.style.left = 0,
            n.style.top = 0,
            n.style.width = r + "px",
            n.style.height = o + "px",
            n.width = r * s.devicePixelRatio,
            n.height = o * s.devicePixelRatio,
            n.setAttribute("data-zr-dom-id", t),
            n
        }
        var n = t("./mixin/Transformable"),
        r = t("./tool/util"),
        o = window.G_vmlCanvasManager,
        s = t("./config"),
        a = function(t, r) {
            this.id = t,
            this.dom = i(t, "canvas", r),
            this.dom.onselectstart = e,
            this.dom.style["-webkit-user-select"] = "none",
            this.dom.style["user-select"] = "none",
            this.dom.style["-webkit-touch-callout"] = "none",
            this.dom.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)",
            o && o.initElement(this.dom),
            this.domBack = null,
            this.ctxBack = null,
            this.painter = r,
            this.unusedCount = 0,
            this.config = null,
            this.dirty = !0,
            this.elCount = 0,
            this.clearColor = 0,
            this.motionBlur = !1,
            this.lastFrameAlpha = .7,
            this.zoomable = !1,
            this.panable = !1,
            this.maxZoom = 1 / 0,
            this.minZoom = 0,
            n.call(this)
        };
        return a.prototype.initContext = function() {
            this.ctx = this.dom.getContext("2d");
            var t = s.devicePixelRatio;
            1 != t && this.ctx.scale(t, t)
        },
        a.prototype.createBackBuffer = function() {
            if (!o) {
                this.domBack = i("back-" + this.id, "canvas", this.painter),
                this.ctxBack = this.domBack.getContext("2d");
                var t = s.devicePixelRatio;
                1 != t && this.ctxBack.scale(t, t)
            }
        },
        a.prototype.resize = function(t, e) {
            var i = s.devicePixelRatio;
            this.dom.style.width = t + "px",
            this.dom.style.height = e + "px",
            this.dom.setAttribute("width", t * i),
            this.dom.setAttribute("height", e * i),
            1 != i && this.ctx.scale(i, i),
            this.domBack && (this.domBack.setAttribute("width", t * i), this.domBack.setAttribute("height", e * i), 1 != i && this.ctxBack.scale(i, i))
        },
        a.prototype.clear = function() {
            var t = this.dom,
            e = this.ctx,
            i = t.width,
            n = t.height,
            r = this.clearColor && !o,
            a = this.motionBlur && !o,
            l = this.lastFrameAlpha,
            h = s.devicePixelRatio;
            if (a && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(t, 0, 0, i / h, n / h)), e.clearRect(0, 0, i / h, n / h), r && (e.save(), e.fillStyle = this.clearColor, e.fillRect(0, 0, i / h, n / h), e.restore()), a) {
                var c = this.domBack;
                e.save(),
                e.globalAlpha = l,
                e.drawImage(c, 0, 0, i / h, n / h),
                e.restore()
            }
        },
        r.merge(a.prototype, n.prototype),
        a
    }),
    i("zrender/loadingEffect/Base", ["require", "../tool/util", "../shape/Text", "../shape/Rectangle"],
    function(t) {
        function e(t) {
            this.setOptions(t)
        }
        var i = t("../tool/util"),
        n = t("../shape/Text"),
        r = t("../shape/Rectangle"),
        o = "Loading...",
        s = "normal 16px Arial";
        return e.prototype.createTextShape = function(t) {
            return new n({
                highlightStyle: i.merge({
                    x: this.canvasWidth / 2,
                    y: this.canvasHeight / 2,
                    text: o,
                    textAlign: "center",
                    textBaseline: "middle",
                    textFont: s,
                    color: "#333",
                    brushType: "fill"
                },
                t, !0)
            })
        },
        e.prototype.createBackgroundShape = function(t) {
            return new r({
                highlightStyle: {
                    x: 0,
                    y: 0,
                    width: this.canvasWidth,
                    height: this.canvasHeight,
                    brushType: "fill",
                    color: t
                }
            })
        },
        e.prototype.start = function(t) {
            function e(e) {
                t.storage.addHover(e)
            }
            function i() {
                t.refreshHover()
            }
            this.canvasWidth = t._width,
            this.canvasHeight = t._height,
            this.loadingTimer = this._start(e, i)
        },
        e.prototype._start = function() {
            return setInterval(function() {},
            1e4)
        },
        e.prototype.stop = function() {
            clearInterval(this.loadingTimer)
        },
        e.prototype.setOptions = function(t) {
            this.options = t || {}
        },
        e.prototype.adjust = function(t, e) {
            return t <= e[0] ? t = e[0] : t >= e[1] && (t = e[1]),
            t
        },
        e.prototype.getLocation = function(t, e, i) {
            var n = null != t.x ? t.x: "center";
            switch (n) {
            case "center":
                n = Math.floor((this.canvasWidth - e) / 2);
                break;
            case "left":
                n = 0;
                break;
            case "right":
                n = this.canvasWidth - e
            }
            var r = null != t.y ? t.y: "center";
            switch (r) {
            case "center":
                r = Math.floor((this.canvasHeight - i) / 2);
                break;
            case "top":
                r = 0;
                break;
            case "bottom":
                r = this.canvasHeight - i
            }
            return {
                x: n,
                y: r,
                width: e,
                height: i
            }
        },
        e
    }),
    i("zrender/shape/Droplet", ["require", "./Base", "./util/PathProxy", "../tool/area", "../tool/util"],
    function(t) {
        "use strict";
        var e = t("./Base"),
        i = t("./util/PathProxy"),
        n = t("../tool/area"),
        r = function(t) {
            e.call(this, t),
            this._pathProxy = new i
        };
        return r.prototype = {
            type: "droplet",
            buildPath: function(t, e) {
                var n = this._pathProxy || new i;
                n.begin(t),
                n.moveTo(e.x, e.y + e.a),
                n.bezierCurveTo(e.x + e.a, e.y + e.a, e.x + 3 * e.a / 2, e.y - e.a / 3, e.x, e.y - e.b),
                n.bezierCurveTo(e.x - 3 * e.a / 2, e.y - e.a / 3, e.x - e.a, e.y + e.a, e.x, e.y + e.a),
                n.closePath()
            },
            getRect: function(t) {
                return t.__rect ? t.__rect: (this._pathProxy.isEmpty() || this.buildPath(null, t), this._pathProxy.fastBoundingRect())
            },
            isCover: function(t, e) {
                var i = this.transformCoordToLocal(t, e);
                return t = i[0],
                e = i[1],
                this.isCoverRect(t, e) ? n.isInsidePath(this._pathProxy.pathCommands, this.style.lineWidth, this.style.brushType, t, e) : void 0
            }
        },
        t("../tool/util").inherits(r, e),
        r
    }),
    i("zrender/shape/Heart", ["require", "./Base", "./util/PathProxy", "../tool/area", "../tool/util"],
    function(t) {
        "use strict";
        var e = t("./Base"),
        i = t("./util/PathProxy"),
        n = t("../tool/area"),
        r = function(t) {
            e.call(this, t),
            this._pathProxy = new i
        };
        return r.prototype = {
            type: "heart",
            buildPath: function(t, e) {
                var n = this._pathProxy || new i;
                n.begin(t),
                n.moveTo(e.x, e.y),
                n.bezierCurveTo(e.x + e.a / 2, e.y - 2 * e.b / 3, e.x + 2 * e.a, e.y + e.b / 3, e.x, e.y + e.b),
                n.bezierCurveTo(e.x - 2 * e.a, e.y + e.b / 3, e.x - e.a / 2, e.y - 2 * e.b / 3, e.x, e.y),
                n.closePath()
            },
            getRect: function(t) {
                return t.__rect ? t.__rect: (this._pathProxy.isEmpty() || this.buildPath(null, t), this._pathProxy.fastBoundingRect())
            },
            isCover: function(t, e) {
                var i = this.transformCoordToLocal(t, e);
                return t = i[0],
                e = i[1],
                this.isCoverRect(t, e) ? n.isInsidePath(this._pathProxy.pathCommands, this.style.lineWidth, this.style.brushType, t, e) : void 0
            }
        },
        t("../tool/util").inherits(r, e),
        r
    }),
    i("zrender/shape/Star", ["require", "../tool/math", "./Base", "../tool/util"],
    function(t) {
        var e = t("../tool/math"),
        i = e.sin,
        n = e.cos,
        r = Math.PI,
        o = t("./Base"),
        s = function(t) {
            o.call(this, t)
        };
        return s.prototype = {
            type: "star",
            buildPath: function(t, e) {
                var o = e.n;
                if (o && !(2 > o)) {
                    var s = e.x,
                    a = e.y,
                    l = e.r,
                    h = e.r0;
                    null == h && (h = o > 4 ? l * n(2 * r / o) / n(r / o) : l / 3);
                    var c = r / o,
                    d = -r / 2,
                    u = s + l * n(d),
                    p = a + l * i(d);
                    d += c;
                    var f = e.pointList = [];
                    f.push([u, p]);
                    for (var g, m = 0,
                    _ = 2 * o - 1; _ > m; m++) g = m % 2 === 0 ? h: l,
                    f.push([s + g * n(d), a + g * i(d)]),
                    d += c;
                    f.push([u, p]),
                    t.moveTo(f[0][0], f[0][1]);
                    for (var m = 0; m < f.length; m++) t.lineTo(f[m][0], f[m][1]);
                    t.closePath()
                }
            },
            getRect: function(t) {
                if (t.__rect) return t.__rect;
                var e;
                return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0,
                t.__rect = {
                    x: Math.round(t.x - t.r - e / 2),
                    y: Math.round(t.y - t.r - e / 2),
                    width: 2 * t.r + e,
                    height: 2 * t.r + e
                },
                t.__rect
            }
        },
        t("../tool/util").inherits(s, o),
        s
    }),
    i("zrender/shape/Rectangle", ["require", "./Base", "../tool/util"],
    function(t) {
        var e = t("./Base"),
        i = function(t) {
            e.call(this, t)
        };
        return i.prototype = {
            type: "rectangle",
            _buildRadiusPath: function(t, e) {
                var i, n, r, o, s = e.x,
                a = e.y,
                l = e.width,
                h = e.height,
                c = e.radius;
                "number" == typeof c ? i = n = r = o = c: c instanceof Array ? 1 === c.length ? i = n = r = o = c[0] : 2 === c.length ? (i = r = c[0], n = o = c[1]) : 3 === c.length ? (i = c[0], n = o = c[1], r = c[2]) : (i = c[0], n = c[1], r = c[2], o = c[3]) : i = n = r = o = 0;
                var d;
                i + n > l && (d = i + n, i *= l / d, n *= l / d),
                r + o > l && (d = r + o, r *= l / d, o *= l / d),
                n + r > h && (d = n + r, n *= h / d, r *= h / d),
                i + o > h && (d = i + o, i *= h / d, o *= h / d),
                t.moveTo(s + i, a),
                t.lineTo(s + l - n, a),
                0 !== n && t.quadraticCurveTo(s + l, a, s + l, a + n),
                t.lineTo(s + l, a + h - r),
                0 !== r && t.quadraticCurveTo(s + l, a + h, s + l - r, a + h),
                t.lineTo(s + o, a + h),
                0 !== o && t.quadraticCurveTo(s, a + h, s, a + h - o),
                t.lineTo(s, a + i),
                0 !== i && t.quadraticCurveTo(s, a, s + i, a)
            },
            buildPath: function(t, e) {
                e.radius ? this._buildRadiusPath(t, e) : (t.moveTo(e.x, e.y), t.lineTo(e.x + e.width, e.y), t.lineTo(e.x + e.width, e.y + e.height), t.lineTo(e.x, e.y + e.height), t.lineTo(e.x, e.y)),
                t.closePath()
            },
            getRect: function(t) {
                if (t.__rect) return t.__rect;
                var e;
                return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0,
                t.__rect = {
                    x: Math.round(t.x - e / 2),
                    y: Math.round(t.y - e / 2),
                    width: t.width + e,
                    height: t.height + e
                },
                t.__rect
            }
        },
        t("../tool/util").inherits(i, e),
        i
    }),
    i("zrender/shape/util/PathProxy", ["require", "../../tool/vector"],
    function(t) {
        var e = t("../../tool/vector"),
        i = function(t, e) {
            this.command = t,
            this.points = e || null
        },
        n = function() {
            this.pathCommands = [],
            this._ctx = null,
            this._min = [],
            this._max = []
        };
        return n.prototype.fastBoundingRect = function() {
            var t = this._min,
            i = this._max;
            t[0] = t[1] = 1 / 0,
            i[0] = i[1] = -1 / 0;
            for (var n = 0; n < this.pathCommands.length; n++) {
                var r = this.pathCommands[n],
                o = r.points;
                switch (r.command) {
                case "M":
                    e.min(t, t, o),
                    e.max(i, i, o);
                    break;
                case "L":
                    e.min(t, t, o),
                    e.max(i, i, o);
                    break;
                case "C":
                    for (var s = 0; 6 > s; s += 2) t[0] = Math.min(t[0], t[0], o[s]),
                    t[1] = Math.min(t[1], t[1], o[s + 1]),
                    i[0] = Math.max(i[0], i[0], o[s]),
                    i[1] = Math.max(i[1], i[1], o[s + 1]);
                    break;
                case "Q":
                    for (var s = 0; 4 > s; s += 2) t[0] = Math.min(t[0], t[0], o[s]),
                    t[1] = Math.min(t[1], t[1], o[s + 1]),
                    i[0] = Math.max(i[0], i[0], o[s]),
                    i[1] = Math.max(i[1], i[1], o[s + 1]);
                    break;
                case "A":
                    var a = o[0],
                    l = o[1],
                    h = o[2],
                    c = o[3];
                    t[0] = Math.min(t[0], t[0], a - h),
                    t[1] = Math.min(t[1], t[1], l - c),
                    i[0] = Math.max(i[0], i[0], a + h),
                    i[1] = Math.max(i[1], i[1], l + c)
                }
            }
            return {
                x: t[0],
                y: t[1],
                width: i[0] - t[0],
                height: i[1] - t[1]
            }
        },
        n.prototype.begin = function(t) {
            return this._ctx = t || null,
            this.pathCommands.length = 0,
            this
        },
        n.prototype.moveTo = function(t, e) {
            return this.pathCommands.push(new i("M", [t, e])),
            this._ctx && this._ctx.moveTo(t, e),
            this
        },
        n.prototype.lineTo = function(t, e) {
            return this.pathCommands.push(new i("L", [t, e])),
            this._ctx && this._ctx.lineTo(t, e),
            this
        },
        n.prototype.bezierCurveTo = function(t, e, n, r, o, s) {
            return this.pathCommands.push(new i("C", [t, e, n, r, o, s])),
            this._ctx && this._ctx.bezierCurveTo(t, e, n, r, o, s),
            this
        },
        n.prototype.quadraticCurveTo = function(t, e, n, r) {
            return this.pathCommands.push(new i("Q", [t, e, n, r])),
            this._ctx && this._ctx.quadraticCurveTo(t, e, n, r),
            this
        },
        n.prototype.arc = function(t, e, n, r, o, s) {
            return this.pathCommands.push(new i("A", [t, e, n, n, r, o - r, 0, s ? 0 : 1])),
            this._ctx && this._ctx.arc(t, e, n, r, o, s),
            this
        },
        n.prototype.arcTo = function(t, e, i, n, r) {
            return this._ctx && this._ctx.arcTo(t, e, i, n, r),
            this
        },
        n.prototype.rect = function(t, e, i, n) {
            return this._ctx && this._ctx.rect(t, e, i, n),
            this
        },
        n.prototype.closePath = function() {
            return this.pathCommands.push(new i("z")),
            this._ctx && this._ctx.closePath(),
            this
        },
        n.prototype.isEmpty = function() {
            return 0 === this.pathCommands.length
        },
        n.PathSegment = i,
        n
    }),
    i("zrender/Group", ["require", "./tool/guid", "./tool/util", "./mixin/Transformable", "./mixin/Eventful"],
    function(t) {
        var e = t("./tool/guid"),
        i = t("./tool/util"),
        n = t("./mixin/Transformable"),
        r = t("./mixin/Eventful"),
        o = function(t) {
            t = t || {},
            this.id = t.id || e();
            for (var i in t) this[i] = t[i];
            this.type = "group",
            this.clipShape = null,
            this._children = [],
            this._storage = null,
            this.__dirty = !0,
            n.call(this),
            r.call(this)
        };
        return o.prototype.ignore = !1,
        o.prototype.children = function() {
            return this._children.slice()
        },
        o.prototype.childAt = function(t) {
            return this._children[t]
        },
        o.prototype.addChild = function(t) {
            t != this && t.parent != this && (t.parent && t.parent.removeChild(t), this._children.push(t), t.parent = this, this._storage && this._storage !== t._storage && (this._storage.addToMap(t), t instanceof o && t.addChildrenToStorage(this._storage)))
        },
        o.prototype.removeChild = function(t) {
            var e = i.indexOf(this._children, t);
            e >= 0 && this._children.splice(e, 1),
            t.parent = null,
            this._storage && (this._storage.delFromMap(t.id), t instanceof o && t.delChildrenFromStorage(this._storage))
        },
        o.prototype.clearChildren = function() {
            for (var t = 0; t < this._children.length; t++) {
                var e = this._children[t];
                this._storage && (this._storage.delFromMap(e.id), e instanceof o && e.delChildrenFromStorage(this._storage))
            }
            this._children.length = 0
        },
        o.prototype.eachChild = function(t, e) {
            for (var i = !!e,
            n = 0; n < this._children.length; n++) {
                var r = this._children[n];
                i ? t.call(e, r) : t(r)
            }
        },
        o.prototype.traverse = function(t, e) {
            for (var i = !!e,
            n = 0; n < this._children.length; n++) {
                var r = this._children[n];
                i ? t.call(e, r) : t(r),
                "group" === r.type && r.traverse(t, e)
            }
        },
        o.prototype.addChildrenToStorage = function(t) {
            for (var e = 0; e < this._children.length; e++) {
                var i = this._children[e];
                t.addToMap(i),
                i instanceof o && i.addChildrenToStorage(t)
            }
        },
        o.prototype.delChildrenFromStorage = function(t) {
            for (var e = 0; e < this._children.length; e++) {
                var i = this._children[e];
                t.delFromMap(i.id),
                i instanceof o && i.delChildrenFromStorage(t)
            }
        },
        o.prototype.modSelf = function() {
            this.__dirty = !0
        },
        i.merge(o.prototype, n.prototype, !0),
        i.merge(o.prototype, r.prototype, !0),
        o
    }),
    i("zrender/shape/BezierCurve", ["require", "./Base", "../tool/util"],
    function(t) {
        "use strict";
        var e = t("./Base"),
        i = function(t) {
            this.brushTypeOnly = "stroke",
            this.textPosition = "end",
            e.call(this, t)
        };
        return i.prototype = {
            type: "bezier-curve",
            buildPath: function(t, e) {
                t.moveTo(e.xStart, e.yStart),
                "undefined" != typeof e.cpX2 && "undefined" != typeof e.cpY2 ? t.bezierCurveTo(e.cpX1, e.cpY1, e.cpX2, e.cpY2, e.xEnd, e.yEnd) : t.quadraticCurveTo(e.cpX1, e.cpY1, e.xEnd, e.yEnd)
            },
            getRect: function(t) {
                if (t.__rect) return t.__rect;
                var e = Math.min(t.xStart, t.xEnd, t.cpX1),
                i = Math.min(t.yStart, t.yEnd, t.cpY1),
                n = Math.max(t.xStart, t.xEnd, t.cpX1),
                r = Math.max(t.yStart, t.yEnd, t.cpY1),
                o = t.cpX2,
                s = t.cpY2;
                "undefined" != typeof o && "undefined" != typeof s && (e = Math.min(e, o), i = Math.min(i, s), n = Math.max(n, o), r = Math.max(r, s));
                var a = t.lineWidth || 1;
                return t.__rect = {
                    x: e - a,
                    y: i - a,
                    width: n - e + a,
                    height: r - i + a
                },
                t.__rect
            }
        },
        t("../tool/util").inherits(i, e),
        i
    }),
    i("zrender/shape/util/dashedLineTo", [],
    function() {
        var t = [5, 5];
        return function(e, i, n, r, o, s) {
            if (e.setLineDash) return t[0] = t[1] = s,
            e.setLineDash(t),
            e.moveTo(i, n),
            void e.lineTo(r, o);
            s = "number" != typeof s ? 5 : s;
            var a = r - i,
            l = o - n,
            h = Math.floor(Math.sqrt(a * a + l * l) / s);
            a /= h,
            l /= h;
            for (var c = !0,
            d = 0; h > d; ++d) c ? e.moveTo(i, n) : e.lineTo(i, n),
            c = !c,
            i += a,
            n += l;
            e.lineTo(r, o)
        }
    }),
    i("zrender/shape/Line", ["require", "./Base", "./util/dashedLineTo", "../tool/util"],
    function(t) {
        var e = t("./Base"),
        i = t("./util/dashedLineTo"),
        n = function(t) {
            this.brushTypeOnly = "stroke",
            this.textPosition = "end",
            e.call(this, t)
        };
        return n.prototype = {
            type: "line",
            buildPath: function(t, e) {
                if (e.lineType && "solid" != e.lineType) {
                    if ("dashed" == e.lineType || "dotted" == e.lineType) {
                        var n = (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                        i(t, e.xStart, e.yStart, e.xEnd, e.yEnd, n)
                    }
                } else t.moveTo(e.xStart, e.yStart),
                t.lineTo(e.xEnd, e.yEnd)
            },
            getRect: function(t) {
                if (t.__rect) return t.__rect;
                var e = t.lineWidth || 1;
                return t.__rect = {
                    x: Math.min(t.xStart, t.xEnd) - e,
                    y: Math.min(t.yStart, t.yEnd) - e,
                    width: Math.abs(t.xStart - t.xEnd) + e,
                    height: Math.abs(t.yStart - t.yEnd) + e
                },
                t.__rect
            }
        },
        t("../tool/util").inherits(n, e),
        n
    }),
    i("echarts/util/shape/normalIsCover", [],
    function() {
        return function(t, e) {
            var i = this.transformCoordToLocal(t, e);
            return t = i[0],
            e = i[1],
            this.isCoverRect(t, e)
        }
    }),
    i("zrender/shape/Polygon", ["require", "./Base", "./util/smoothSpline", "./util/smoothBezier", "./util/dashedLineTo", "../tool/util"],
    function(t) {
        var e = t("./Base"),
        i = t("./util/smoothSpline"),
        n = t("./util/smoothBezier"),
        r = t("./util/dashedLineTo"),
        o = function(t) {
            e.call(this, t)
        };
        return o.prototype = {
            type: "polygon",
            buildPath: function(t, e) {
                var o = e.pointList;
                if (! (o.length < 2)) {
                    if (e.smooth && "spline" !== e.smooth) {
                        var s = n(o, e.smooth, !0, e.smoothConstraint);
                        t.moveTo(o[0][0], o[0][1]);
                        for (var a, l, h, c = o.length,
                        d = 0; c > d; d++) a = s[2 * d],
                        l = s[2 * d + 1],
                        h = o[(d + 1) % c],
                        t.bezierCurveTo(a[0], a[1], l[0], l[1], h[0], h[1])
                    } else if ("spline" === e.smooth && (o = i(o, !0)), e.lineType && "solid" != e.lineType) {
                        if ("dashed" == e.lineType || "dotted" == e.lineType) {
                            var u = e._dashLength || (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                            e._dashLength = u,
                            t.moveTo(o[0][0], o[0][1]);
                            for (var d = 1,
                            p = o.length; p > d; d++) r(t, o[d - 1][0], o[d - 1][1], o[d][0], o[d][1], u);
                            r(t, o[o.length - 1][0], o[o.length - 1][1], o[0][0], o[0][1], u)
                        }
                    } else {
                        t.moveTo(o[0][0], o[0][1]);
                        for (var d = 1,
                        p = o.length; p > d; d++) t.lineTo(o[d][0], o[d][1]);
                        t.lineTo(o[0][0], o[0][1])
                    }
                    t.closePath()
                }
            },
            getRect: function(t) {
                if (t.__rect) return t.__rect;
                for (var e = Number.MAX_VALUE,
                i = Number.MIN_VALUE,
                n = Number.MAX_VALUE,
                r = Number.MIN_VALUE,
                o = t.pointList,
                s = 0,
                a = o.length; a > s; s++) o[s][0] < e && (e = o[s][0]),
                o[s][0] > i && (i = o[s][0]),
                o[s][1] < n && (n = o[s][1]),
                o[s][1] > r && (r = o[s][1]);
                var l;
                return l = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0,
                t.__rect = {
                    x: Math.round(e - l / 2),
                    y: Math.round(n - l / 2),
                    width: i - e + l,
                    height: r - n + l
                },
                t.__rect
            }
        },
        t("../tool/util").inherits(o, e),
        o
    }),
    i("zrender/animation/Clip", ["require", "./easing"],
    function(t) {
        function e(t) {
            this._targetPool = t.target || {},
            this._targetPool instanceof Array || (this._targetPool = [this._targetPool]),
            this._life = t.life || 1e3,
            this._delay = t.delay || 0,
            this._startTime = (new Date).getTime() + this._delay,
            this._endTime = this._startTime + 1e3 * this._life,
            this.loop = "undefined" == typeof t.loop ? !1 : t.loop,
            this.gap = t.gap || 0,
            this.easing = t.easing || "Linear",
            this.onframe = t.onframe,
            this.ondestroy = t.ondestroy,
            this.onrestart = t.onrestart
        }
        var i = t("./easing");
        return e.prototype = {
            step: function(t) {
                var e = (t - this._startTime) / this._life;
                if (! (0 > e)) {
                    e = Math.min(e, 1);
                    var n = "string" == typeof this.easing ? i[this.easing] : this.easing,
                    r = "function" == typeof n ? n(e) : e;
                    return this.fire("frame", r),
                    1 == e ? this.loop ? (this.restart(), "restart") : (this._needsRemove = !0, "destroy") : null
                }
            },
            restart: function() {
                var t = (new Date).getTime(),
                e = (t - this._startTime) % this._life;
                this._startTime = (new Date).getTime() - e + this.gap,
                this._needsRemove = !1
            },
            fire: function(t, e) {
                for (var i = 0,
                n = this._targetPool.length; n > i; i++) this["on" + t] && this["on" + t](this._targetPool[i], e)
            },
            constructor: e
        },
        e
    }),
    i("zrender/shape/util/smoothBezier", ["require", "../../tool/vector"],
    function(t) {
        var e = t("../../tool/vector");
        return function(t, i, n, r) {
            var o, s, a, l, h = [],
            c = [],
            d = [],
            u = [],
            p = !!r;
            if (p) {
                a = [1 / 0, 1 / 0],
                l = [ - 1 / 0, -1 / 0];
                for (var f = 0,
                g = t.length; g > f; f++) e.min(a, a, t[f]),
                e.max(l, l, t[f]);
                e.min(a, a, r[0]),
                e.max(l, l, r[1])
            }
            for (var f = 0,
            g = t.length; g > f; f++) {
                var o, s, m = t[f];
                if (n) o = t[f ? f - 1 : g - 1],
                s = t[(f + 1) % g];
                else {
                    if (0 === f || f === g - 1) {
                        h.push(e.clone(t[f]));
                        continue
                    }
                    o = t[f - 1],
                    s = t[f + 1]
                }
                e.sub(c, s, o),
                e.scale(c, c, i);
                var _ = e.distance(m, o),
                y = e.distance(m, s),
                v = _ + y;
                0 !== v && (_ /= v, y /= v),
                e.scale(d, c, -_),
                e.scale(u, c, y);
                var b = e.add([], m, d),
                x = e.add([], m, u);
                p && (e.max(b, b, a), e.min(b, b, l), e.max(x, x, a), e.min(x, x, l)),
                h.push(b),
                h.push(x)
            }
            return n && h.push(e.clone(h.shift())),
            h
        }
    }),
    i("zrender/shape/util/smoothSpline", ["require", "../../tool/vector"],
    function(t) {
        function e(t, e, i, n, r, o, s) {
            var a = .5 * (i - t),
            l = .5 * (n - e);
            return (2 * (e - i) + a + l) * s + ( - 3 * (e - i) - 2 * a - l) * o + a * r + e
        }
        var i = t("../../tool/vector");
        return function(t, n) {
            for (var r = t.length,
            o = [], s = 0, a = 1; r > a; a++) s += i.distance(t[a - 1], t[a]);
            var l = s / 5;
            l = r > l ? r: l;
            for (var a = 0; l > a; a++) {
                var h, c, d, u = a / (l - 1) * (n ? r: r - 1),
                p = Math.floor(u),
                f = u - p,
                g = t[p % r];
                n ? (h = t[(p - 1 + r) % r], c = t[(p + 1) % r], d = t[(p + 2) % r]) : (h = t[0 === p ? p: p - 1], c = t[p > r - 2 ? r - 1 : p + 1], d = t[p > r - 3 ? r - 1 : p + 2]);
                var m = f * f,
                _ = f * m;
                o.push([e(h[0], g[0], c[0], d[0], f, m, _), e(h[1], g[1], c[1], d[1], f, m, _)])
            }
            return o
        }
    }),
    i("echarts/util/number", [],
    function() {
        function t(t) {
            return t.replace(/^\s+/, "").replace(/\s+$/, "")
        }
        function e(e, i) {
            return "string" == typeof e ? t(e).match(/%$/) ? parseFloat(e) / 100 * i: parseFloat(e) : e
        }
        function i(t, i) {
            return [e(i[0], t.getWidth()), e(i[1], t.getHeight())]
        }
        function n(t, i) {
            i instanceof Array || (i = [0, i]);
            var n = Math.min(t.getWidth(), t.getHeight()) / 2;
            return [e(i[0], n), e(i[1], n)]
        }
        function r(t) {
            return isNaN(t) ? "-": (t = (t + "").split("."), t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : ""))
        }
        return {
            parsePercent: e,
            parseCenter: i,
            parseRadius: n,
            addCommas: r
        }
    }),
    i("zrender/animation/easing", [],
    function() {
        var t = {
            Linear: function(t) {
                return t
            },
            QuadraticIn: function(t) {
                return t * t
            },
            QuadraticOut: function(t) {
                return t * (2 - t)
            },
            QuadraticInOut: function(t) {
                return (t *= 2) < 1 ? .5 * t * t: -.5 * (--t * (t - 2) - 1)
            },
            CubicIn: function(t) {
                return t * t * t
            },
            CubicOut: function(t) {
                return--t * t * t + 1
            },
            CubicInOut: function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t: .5 * ((t -= 2) * t * t + 2)
            },
            QuarticIn: function(t) {
                return t * t * t * t
            },
            QuarticOut: function(t) {
                return 1 - --t * t * t * t
            },
            QuarticInOut: function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t: -.5 * ((t -= 2) * t * t * t - 2)
            },
            QuinticIn: function(t) {
                return t * t * t * t * t
            },
            QuinticOut: function(t) {
                return--t * t * t * t * t + 1
            },
            QuinticInOut: function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t * t: .5 * ((t -= 2) * t * t * t * t + 2)
            },
            SinusoidalIn: function(t) {
                return 1 - Math.cos(t * Math.PI / 2)
            },
            SinusoidalOut: function(t) {
                return Math.sin(t * Math.PI / 2)
            },
            SinusoidalInOut: function(t) {
                return.5 * (1 - Math.cos(Math.PI * t))
            },
            ExponentialIn: function(t) {
                return 0 === t ? 0 : Math.pow(1024, t - 1)
            },
            ExponentialOut: function(t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
            },
            ExponentialInOut: function(t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * ( - Math.pow(2, -10 * (t - 1)) + 2)
            },
            CircularIn: function(t) {
                return 1 - Math.sqrt(1 - t * t)
            },
            CircularOut: function(t) {
                return Math.sqrt(1 - --t * t)
            },
            CircularInOut: function(t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            },
            ElasticIn: function(t) {
                var e, i = .1,
                n = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = n / 4) : e = n * Math.asin(1 / i) / (2 * Math.PI), -(i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / n)))
            },
            ElasticOut: function(t) {
                var e, i = .1,
                n = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = n / 4) : e = n * Math.asin(1 / i) / (2 * Math.PI), i * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / n) + 1)
            },
            ElasticInOut: function(t) {
                var e, i = .1,
                n = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = n / 4) : e = n * Math.asin(1 / i) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / n) : i * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / n) * .5 + 1)
            },
            BackIn: function(t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            },
            BackOut: function(t) {
                var e = 1.70158;
                return--t * t * ((e + 1) * t + e) + 1
            },
            BackInOut: function(t) {
                var e = 2.5949095;
                return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
            },
            BounceIn: function(e) {
                return 1 - t.BounceOut(1 - e)
            },
            BounceOut: function(t) {
                return 1 / 2.75 > t ? 7.5625 * t * t: 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            },
            BounceInOut: function(e) {
                return.5 > e ? .5 * t.BounceIn(2 * e) : .5 * t.BounceOut(2 * e - 1) + .5
            }
        };
        return t
    }),
    i("echarts/util/ecQuery", ["require", "zrender/tool/util"],
    function(t) {
        function e(t, e) {
            if ("undefined" != typeof t) {
                if (!e) return t;
                e = e.split(".");
                for (var i = e.length,
                n = 0; i > n;) {
                    if (t = t[e[n]], "undefined" == typeof t) return;
                    n++
                }
                return t
            }
        }
        function i(t, i) {
            for (var n, r = 0,
            o = t.length; o > r; r++) if (n = e(t[r], i), "undefined" != typeof n) return n
        }
        function n(t, i) {
            for (var n, o = t.length; o--;) {
                var s = e(t[o], i);
                "undefined" != typeof s && ("undefined" == typeof n ? n = r.clone(s) : r.merge(n, s, !0))
            }
            return n
        }
        var r = t("zrender/tool/util");
        return {
            query: e,
            deepQuery: i,
            deepMerge: n
        }
    }),
    i("echarts/data/KDTree", ["require", "./quickSelect"],
    function(t) {
        function e(t, e) {
            this.left = null,
            this.right = null,
            this.axis = t,
            this.data = e
        }
        var i = t("./quickSelect"),
        n = function(t, e) {
            t.length && (e || (e = t[0].array.length), this.dimension = e, this.root = this._buildTree(t, 0, t.length - 1, 0), this._stack = [], this._nearstNList = [])
        };
        return n.prototype._buildTree = function(t, n, r, o) {
            if (n > r) return null;
            var s = Math.floor((n + r) / 2);
            s = i(t, n, r, s,
            function(t, e) {
                return t.array[o] - e.array[o]
            });
            var a = t[s],
            l = new e(o, a);
            return o = (o + 1) % this.dimension,
            r > n && (l.left = this._buildTree(t, n, s - 1, o), l.right = this._buildTree(t, s + 1, r, o)),
            l
        },
        n.prototype.nearest = function(t, e) {
            var i = this.root,
            n = this._stack,
            r = 0,
            o = 1 / 0,
            s = null;
            for (i.data !== t && (o = e(i.data, t), s = i), t.array[i.axis] < i.data.array[i.axis] ? (i.right && (n[r++] = i.right), i.left && (n[r++] = i.left)) : (i.left && (n[r++] = i.left), i.right && (n[r++] = i.right)); r--;) {
                i = n[r];
                var a = t.array[i.axis] - i.data.array[i.axis],
                l = 0 > a,
                h = !1;
                a *= a,
                o > a && (a = e(i.data, t), o > a && i.data !== t && (o = a, s = i), h = !0),
                l ? (h && i.right && (n[r++] = i.right), i.left && (n[r++] = i.left)) : (h && i.left && (n[r++] = i.left), i.right && (n[r++] = i.right))
            }
            return s.data
        },
        n.prototype._addNearest = function(t, e, i) {
            for (var n = this._nearstNList,
            r = t - 1; r > 0 && !(e >= n[r - 1].dist); r--) n[r].dist = n[r - 1].dist,
            n[r].node = n[r - 1].node;
            n[r].dist = e,
            n[r].node = i
        },
        n.prototype.nearestN = function(t, e, i, n) {
            if (0 >= e) return n.length = 0,
            n;
            for (var r = this.root,
            o = this._stack,
            s = 0,
            a = this._nearstNList,
            l = 0; e > l; l++) a[l] || (a[l] = {}),
            a[l].dist = 0,
            a[l].node = null;
            var h = i(r.data, t),
            c = 0;
            for (r.data !== t && (c++, this._addNearest(c, h, r)), t.array[r.axis] < r.data.array[r.axis] ? (r.right && (o[s++] = r.right), r.left && (o[s++] = r.left)) : (r.left && (o[s++] = r.left), r.right && (o[s++] = r.right)); s--;) {
                r = o[s];
                var h = t.array[r.axis] - r.data.array[r.axis],
                d = 0 > h,
                u = !1;
                h *= h,
                (e > c || h < a[c - 1].dist) && (h = i(r.data, t), (e > c || h < a[c - 1].dist) && r.data !== t && (e > c && c++, this._addNearest(c, h, r)), u = !0),
                d ? (u && r.right && (o[s++] = r.right), r.left && (o[s++] = r.left)) : (u && r.left && (o[s++] = r.left), r.right && (o[s++] = r.right))
            }
            for (var l = 0; c > l; l++) n[l] = a[l].node.data;
            return n.length = c,
            n
        },
        n
    }),
    i("echarts/data/quickSelect", ["require"],
    function() {
        function t(t, e) {
            return t - e
        }
        function e(t, e, i) {
            var n = t[e];
            t[e] = t[i],
            t[i] = n
        }
        function i(t, i, n, r, o) {
            for (var s = i; n > i;) {
                var s = Math.round((n + i) / 2),
                a = t[s];
                e(t, s, n),
                s = i;
                for (var l = i; n - 1 >= l; l++) o(a, t[l]) >= 0 && (e(t, l, s), s++);
                if (e(t, n, s), s === r) return s;
                r > s ? i = s + 1 : n = s - 1
            }
            return i
        }
        function n(e, n, r, o, s) {
            return arguments.length <= 3 && (o = n, s = 2 == arguments.length ? t: r, n = 0, r = e.length - 1),
            i(e, n, r, o, s)
        }
        return n
    }),
    i("echarts/component/dataView", ["require", "./base", "../config", "zrender/tool/util", "../component"],
    function(t) {
        function e(t, e, n, r, o) {
            i.call(this, t, e, n, r, o),
            this.dom = o.dom,
            this._tDom = document.createElement("div"),
            this._textArea = document.createElement("textArea"),
            this._buttonRefresh = document.createElement("button"),
            this._buttonClose = document.createElement("button"),
            this._hasShow = !1,
            this._zrHeight = n.getHeight(),
            this._zrWidth = n.getWidth(),
            this._tDom.className = "echarts-dataview",
            this.hide(),
            this.dom.firstChild.appendChild(this._tDom),
            window.addEventListener ? (this._tDom.addEventListener("click", this._stop), this._tDom.addEventListener("mousewheel", this._stop), this._tDom.addEventListener("mousemove", this._stop), this._tDom.addEventListener("mousedown", this._stop), this._tDom.addEventListener("mouseup", this._stop), this._tDom.addEventListener("touchstart", this._stop), this._tDom.addEventListener("touchmove", this._stop), this._tDom.addEventListener("touchend", this._stop)) : (this._tDom.attachEvent("onclick", this._stop), this._tDom.attachEvent("onmousewheel", this._stop), this._tDom.attachEvent("onmousemove", this._stop), this._tDom.attachEvent("onmousedown", this._stop), this._tDom.attachEvent("onmouseup", this._stop))
        }
        var i = t("./base"),
        n = t("../config"),
        r = t("zrender/tool/util");
        return e.prototype = {
            type: n.COMPONENT_TYPE_DATAVIEW,
            _lang: ["Data View", "close", "refresh"],
            _gCssText: "position:absolute;display:block;overflow:hidden;transition:height 0.8s,background-color 1s;-moz-transition:height 0.8s,background-color 1s;-webkit-transition:height 0.8s,background-color 1s;-o-transition:height 0.8s,background-color 1s;z-index:1;left:0;top:0;",
            hide: function() {
                this._sizeCssText = "width:" + this._zrWidth + "px;height:0px;background-color:#f0ffff;",
                this._tDom.style.cssText = this._gCssText + this._sizeCssText
            },
            show: function(t) {
                this._hasShow = !0;
                var e = this.query(this.option, "toolbox.feature.dataView.lang") || this._lang;
                this.option = t,
                this._tDom.innerHTML = '<p style="padding:8px 0;margin:0 0 10px 0;border-bottom:1px solid #eee">' + (e[0] || this._lang[0]) + "</p>";
                var i = this.query(this.option, "toolbox.feature.dataView.optionToContent");
                "function" != typeof i ? this._textArea.value = this._optionToContent() : (this._textArea = document.createElement("div"), this._textArea.innerHTML = i(this.option)),
                this._textArea.style.cssText = "display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:100%;height:" + (this._zrHeight - 100) + "px;",
                this._tDom.appendChild(this._textArea),
                this._buttonClose.style.cssText = "float:right;padding:1px 6px;",
                this._buttonClose.innerHTML = e[1] || this._lang[1];
                var n = this;
                this._buttonClose.onclick = function() {
                    n.hide()
                },
                this._tDom.appendChild(this._buttonClose),
                this.query(this.option, "toolbox.feature.dataView.readOnly") === !1 ? (this._buttonRefresh.style.cssText = "float:right;margin-right:10px;padding:1px 6px;", this._buttonRefresh.innerHTML = e[2] || this._lang[2], this._buttonRefresh.onclick = function() {
                    n._save()
                },
                this._textArea.readOnly = !1, this._textArea.style.cursor = "default") : (this._buttonRefresh.style.cssText = "display:none", this._textArea.readOnly = !0, this._textArea.style.cursor = "text"),
                this._tDom.appendChild(this._buttonRefresh),
                this._sizeCssText = "width:" + this._zrWidth + "px;height:" + this._zrHeight + "px;background-color:#fff;",
                this._tDom.style.cssText = this._gCssText + this._sizeCssText
            },
            _optionToContent: function() {
                var t, e, i, r, o, s, a = [],
                l = "";
                if (this.option.xAxis) for (a = this.option.xAxis instanceof Array ? this.option.xAxis: [this.option.xAxis], t = 0, r = a.length; r > t; t++) if ("category" == (a[t].type || "category")) {
                    for (s = [], e = 0, i = a[t].data.length; i > e; e++) s.push(this.getDataFromOption(a[t].data[e]));
                    l += s.join(", ") + "\n\n"
                }
                if (this.option.yAxis) for (a = this.option.yAxis instanceof Array ? this.option.yAxis: [this.option.yAxis], t = 0, r = a.length; r > t; t++) if ("category" == a[t].type) {
                    for (s = [], e = 0, i = a[t].data.length; i > e; e++) s.push(this.getDataFromOption(a[t].data[e]));
                    l += s.join(", ") + "\n\n"
                }
                var h, c = this.option.series;
                for (t = 0, r = c.length; r > t; t++) {
                    for (s = [], e = 0, i = c[t].data.length; i > e; e++) o = c[t].data[e],
                    h = c[t].type == n.CHART_TYPE_PIE || c[t].type == n.CHART_TYPE_MAP ? (o.name || "-") + ":": "",
                    c[t].type == n.CHART_TYPE_SCATTER && (o = this.getDataFromOption(o).join(", ")),
                    s.push(h + this.getDataFromOption(o));
                    l += (c[t].name || "-") + " : \n",
                    l += s.join(c[t].type == n.CHART_TYPE_SCATTER ? "\n": ", "),
                    l += "\n\n"
                }
                return l
            },
            _save: function() {
                var t = this.query(this.option, "toolbox.feature.dataView.contentToOption");
                if ("function" != typeof t) {
                    for (var e = this._textArea.value.split("\n"), i = [], r = 0, o = e.length; o > r; r++) e[r] = this._trim(e[r]),
                    "" !== e[r] && i.push(e[r]);
                    this._contentToOption(i)
                } else t(this._textArea, this.option);
                this.hide();
                var s = this;
                setTimeout(function() {
                    s.messageCenter && s.messageCenter.dispatch(n.EVENT.DATA_VIEW_CHANGED, null, {
                        option: s.option
                    },
                    s.myChart)
                },
                s.canvasSupported ? 800 : 100)
            },
            _contentToOption: function(t) {
                var e, i, r, o, s, a, l, h = [],
                c = 0;
                if (this.option.xAxis) for (h = this.option.xAxis instanceof Array ? this.option.xAxis: [this.option.xAxis], e = 0, o = h.length; o > e; e++) if ("category" == (h[e].type || "category")) {
                    for (a = t[c].split(","), i = 0, r = h[e].data.length; r > i; i++) l = this._trim(a[i] || ""),
                    s = h[e].data[i],
                    "undefined" != typeof h[e].data[i].value ? h[e].data[i].value = l: h[e].data[i] = l;
                    c++
                }
                if (this.option.yAxis) for (h = this.option.yAxis instanceof Array ? this.option.yAxis: [this.option.yAxis], e = 0, o = h.length; o > e; e++) if ("category" == h[e].type) {
                    for (a = t[c].split(","), i = 0, r = h[e].data.length; r > i; i++) l = this._trim(a[i] || ""),
                    s = h[e].data[i],
                    "undefined" != typeof h[e].data[i].value ? h[e].data[i].value = l: h[e].data[i] = l;
                    c++
                }
                var d = this.option.series;
                for (e = 0, o = d.length; o > e; e++) if (c++, d[e].type == n.CHART_TYPE_SCATTER) for (var i = 0,
                r = d[e].data.length; r > i; i++) a = t[c],
                l = a.replace(" ", "").split(","),
                "undefined" != typeof d[e].data[i].value ? d[e].data[i].value = l: d[e].data[i] = l,
                c++;
                else {
                    a = t[c].split(",");
                    for (var i = 0,
                    r = d[e].data.length; r > i; i++) l = (a[i] || "").replace(/.*:/, ""),
                    l = this._trim(l),
                    l = "-" != l && "" !== l ? l - 0 : "-",
                    "undefined" != typeof d[e].data[i].value ? d[e].data[i].value = l: d[e].data[i] = l;
                    c++
                }
            },
            _trim: function(t) {
                var e = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
                return t.replace(e, "")
            },
            _stop: function(t) {
                t = t || window.event,
                t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
            },
            resize: function() {
                this._zrHeight = this.zr.getHeight(),
                this._zrWidth = this.zr.getWidth(),
                this._tDom.offsetHeight > 10 && (this._sizeCssText = "width:" + this._zrWidth + "px;height:" + this._zrHeight + "px;background-color:#fff;", this._tDom.style.cssText = this._gCssText + this._sizeCssText, this._textArea.style.cssText = "display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:100%;height:" + (this._zrHeight - 100) + "px;")
            },
            dispose: function() {
                window.removeEventListener ? (this._tDom.removeEventListener("click", this._stop), this._tDom.removeEventListener("mousewheel", this._stop), this._tDom.removeEventListener("mousemove", this._stop), this._tDom.removeEventListener("mousedown", this._stop), this._tDom.removeEventListener("mouseup", this._stop), this._tDom.removeEventListener("touchstart", this._stop), this._tDom.removeEventListener("touchmove", this._stop), this._tDom.removeEventListener("touchend", this._stop)) : (this._tDom.detachEvent("onclick", this._stop), this._tDom.detachEvent("onmousewheel", this._stop), this._tDom.detachEvent("onmousemove", this._stop), this._tDom.detachEvent("onmousedown", this._stop), this._tDom.detachEvent("onmouseup", this._stop)),
                this._buttonRefresh.onclick = null,
                this._buttonClose.onclick = null,
                this._hasShow && (this._tDom.removeChild(this._textArea), this._tDom.removeChild(this._buttonRefresh), this._tDom.removeChild(this._buttonClose)),
                this._textArea = null,
                this._buttonRefresh = null,
                this._buttonClose = null,
                this.dom.firstChild.removeChild(this._tDom),
                this._tDom = null
            }
        },
        r.inherits(e, i),
        t("../component").define("dataView", e),
        e
    }),
    i("zrender/tool/computeBoundingBox", ["require", "./vector", "./curve"],
    function(t) {
        function e(t, e, i) {
            if (0 !== t.length) {
                for (var n = t[0][0], r = t[0][0], o = t[0][1], s = t[0][1], a = 1; a < t.length; a++) {
                    var l = t[a];
                    l[0] < n && (n = l[0]),
                    l[0] > r && (r = l[0]),
                    l[1] < o && (o = l[1]),
                    l[1] > s && (s = l[1])
                }
                e[0] = n,
                e[1] = o,
                i[0] = r,
                i[1] = s
            }
        }
        function i(t, e, i, n, r, s) {
            var a = [];
            o.cubicExtrema(t[0], e[0], i[0], n[0], a);
            for (var l = 0; l < a.length; l++) a[l] = o.cubicAt(t[0], e[0], i[0], n[0], a[l]);
            var h = [];
            o.cubicExtrema(t[1], e[1], i[1], n[1], h);
            for (var l = 0; l < h.length; l++) h[l] = o.cubicAt(t[1], e[1], i[1], n[1], h[l]);
            a.push(t[0], n[0]),
            h.push(t[1], n[1]);
            var c = Math.min.apply(null, a),
            d = Math.max.apply(null, a),
            u = Math.min.apply(null, h),
            p = Math.max.apply(null, h);
            r[0] = c,
            r[1] = u,
            s[0] = d,
            s[1] = p
        }
        function n(t, e, i, n, r) {
            var s = o.quadraticExtremum(t[0], e[0], i[0]),
            a = o.quadraticExtremum(t[1], e[1], i[1]);
            s = Math.max(Math.min(s, 1), 0),
            a = Math.max(Math.min(a, 1), 0);
            var l = 1 - s,
            h = 1 - a,
            c = l * l * t[0] + 2 * l * s * e[0] + s * s * i[0],
            d = l * l * t[1] + 2 * l * s * e[1] + s * s * i[1],
            u = h * h * t[0] + 2 * h * a * e[0] + a * a * i[0],
            p = h * h * t[1] + 2 * h * a * e[1] + a * a * i[1];
            n[0] = Math.min(t[0], i[0], c, u),
            n[1] = Math.min(t[1], i[1], d, p),
            r[0] = Math.max(t[0], i[0], c, u),
            r[1] = Math.max(t[1], i[1], d, p)
        }
        var r = t("./vector"),
        o = t("./curve"),
        s = r.create(),
        a = r.create(),
        l = r.create(),
        h = function(t, e, i, n, o, h, c, d) {
            if (Math.abs(n - o) >= 2 * Math.PI) return c[0] = t - i,
            c[1] = e - i,
            d[0] = t + i,
            void(d[1] = e + i);
            if (s[0] = Math.cos(n) * i + t, s[1] = Math.sin(n) * i + e, a[0] = Math.cos(o) * i + t, a[1] = Math.sin(o) * i + e, r.min(c, s, a), r.max(d, s, a), n %= 2 * Math.PI, 0 > n && (n += 2 * Math.PI), o %= 2 * Math.PI, 0 > o && (o += 2 * Math.PI), n > o && !h ? o += 2 * Math.PI: o > n && h && (n += 2 * Math.PI), h) {
                var u = o;
                o = n,
                n = u
            }
            for (var p = 0; o > p; p += Math.PI / 2) p > n && (l[0] = Math.cos(p) * i + t, l[1] = Math.sin(p) * i + e, r.min(c, l, c), r.max(d, l, d))
        };
        return e.cubeBezier = i,
        e.quadraticBezier = n,
        e.arc = h,
        e
    }),
    i("echarts/util/shape/Cross", ["require", "zrender/shape/Base", "zrender/shape/Line", "zrender/tool/util", "./normalIsCover"],
    function(t) {
        function e(t) {
            i.call(this, t)
        }
        var i = t("zrender/shape/Base"),
        n = t("zrender/shape/Line"),
        r = t("zrender/tool/util");
        return e.prototype = {
            type: "cross",
            buildPath: function(t, e) {
                var i = e.rect;
                e.xStart = i.x,
                e.xEnd = i.x + i.width,
                e.yStart = e.yEnd = e.y,
                n.prototype.buildPath(t, e),
                e.xStart = e.xEnd = e.x,
                e.yStart = i.y,
                e.yEnd = i.y + i.height,
                n.prototype.buildPath(t, e)
            },
            getRect: function(t) {
                return t.rect
            },
            isCover: t("./normalIsCover")
        },
        r.inherits(e, i),
        e
    }),
    i("echarts/util/shape/Candle", ["require", "zrender/shape/Base", "zrender/tool/util", "./normalIsCover"],
    function(t) {
        function e(t) {
            i.call(this, t)
        }
        var i = t("zrender/shape/Base"),
        n = t("zrender/tool/util");
        return e.prototype = {
            type: "candle",
            _numberOrder: function(t, e) {
                return e - t
            },
            buildPath: function(t, e) {
                var i = n.clone(e.y).sort(this._numberOrder);
                t.moveTo(e.x, i[3]),
                t.lineTo(e.x, i[2]),
                t.moveTo(e.x - e.width / 2, i[2]),
                t.rect(e.x - e.width / 2, i[2], e.width, i[1] - i[2]),
                t.moveTo(e.x, i[1]),
                t.lineTo(e.x, i[0])
            },
            getRect: function(t) {
                if (!t.__rect) {
                    var e = 0; ("stroke" == t.brushType || "fill" == t.brushType) && (e = t.lineWidth || 1);
                    var i = n.clone(t.y).sort(this._numberOrder);
                    t.__rect = {
                        x: Math.round(t.x - t.width / 2 - e / 2),
                        y: Math.round(i[3] - e / 2),
                        width: t.width + e,
                        height: i[0] - i[3] + e
                    }
                }
                return t.__rect
            },
            isCover: t("./normalIsCover")
        },
        n.inherits(e, i),
        e
    }),
    i("echarts/util/shape/Chain", ["require", "zrender/shape/Base", "./Icon", "zrender/shape/util/dashedLineTo", "zrender/tool/util", "zrender/tool/matrix"],
    function(t) {
        function e(t) {
            i.call(this, t)
        }
        var i = t("zrender/shape/Base"),
        n = t("./Icon"),
        r = t("zrender/shape/util/dashedLineTo"),
        o = t("zrender/tool/util"),
        s = t("zrender/tool/matrix");
        return e.prototype = {
            type: "chain",
            brush: function(t, e) {
                var i = this.style;
                e && (i = this.getHighlightStyle(i, this.highlightStyle || {})),
                t.save(),
                this.setContext(t, i),
                this.setTransform(t),
                t.save(),
                t.beginPath(),
                this.buildLinePath(t, i),
                t.stroke(),
                t.restore(),
                this.brushSymbol(t, i),
                t.restore()
            },
            buildLinePath: function(t, e) {
                var i = e.x,
                n = e.y + 5,
                o = e.width,
                s = e.height / 2 - 10;
                if (t.moveTo(i, n), t.lineTo(i, n + s), t.moveTo(i + o, n), t.lineTo(i + o, n + s), t.moveTo(i, n + s / 2), e.lineType && "solid" != e.lineType) {
                    if ("dashed" == e.lineType || "dotted" == e.lineType) {
                        var a = (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                        r(t, i, n + s / 2, i + o, n + s / 2, a)
                    }
                } else t.lineTo(i + o, n + s / 2)
            },
            brushSymbol: function(t, e) {
                var i = e.y + e.height / 4;
                t.save();
                for (var r, o = e.chainPoint,
                s = 0,
                a = o.length; a > s; s++) {
                    if (r = o[s], "none" != r.symbol) {
                        t.beginPath();
                        var l = r.symbolSize;
                        n.prototype.buildPath(t, {
                            iconType: r.symbol,
                            x: r.x - l,
                            y: i - l,
                            width: 2 * l,
                            height: 2 * l,
                            n: r.n
                        }),
                        t.fillStyle = r.isEmpty ? "#fff": e.strokeColor,
                        t.closePath(),
                        t.fill(),
                        t.stroke()
                    }
                    r.showLabel && (t.font = r.textFont, t.fillStyle = r.textColor, t.textAlign = r.textAlign, t.textBaseline = r.textBaseline, r.rotation ? (t.save(), this._updateTextTransform(t, r.rotation), t.fillText(r.name, r.textX, r.textY), t.restore()) : t.fillText(r.name, r.textX, r.textY))
                }
                t.restore()
            },
            _updateTextTransform: function(t, e) {
                var i = s.create();
                if (s.identity(i), 0 !== e[0]) {
                    var n = e[1] || 0,
                    r = e[2] || 0; (n || r) && s.translate(i, i, [ - n, -r]),
                    s.rotate(i, i, e[0]),
                    (n || r) && s.translate(i, i, [n, r])
                }
                t.transform.apply(t, i)
            },
            isCover: function(t, e) {
                var i = this.style;
                return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height ? !0 : !1
            }
        },
        o.inherits(e, i),
        e
    }),
    i("zrender", ["zrender/zrender"],
    function(t) {
        return t
    }),
    i("echarts", ["echarts/echarts"],
    function(t) {
        return t
    });
    var n = e("zrender");
    n.tool = {
        color: e("zrender/tool/color"),
        math: e("zrender/tool/math"),
        util: e("zrender/tool/util"),
        vector: e("zrender/tool/vector"),
        area: e("zrender/tool/area"),
        event: e("zrender/tool/event")
    },
    n.animation = {
        Animation: e("zrender/animation/Animation"),
        Cip: e("zrender/animation/Clip"),
        easing: e("zrender/animation/easing")
    };
    var r = e("echarts");
    r.config = e("echarts/config"),
    e("echarts/chart/pie"),
    t.echarts = r,
    t.zrender = n
} (window),
define("echarts",
function() {}),
define("apps/newoutlet/models/profit", ["backbone"],
function(t) {
    return t.Model.extend({
        url: function() {
            return _global.url.api + "my_income?did=" + _global.did
        }
    })
}),
define("text!apps/newoutlet/templates/profit.html", [],
function() {
    return '<header style="height:120px">\r\n    <div class="mark-text">预计收益（元）\r\n        <a class="more-link" style="margin: 0" href="/outlet#income">查看明细</a></div>\r\n    <div class="amount-box clearfix">\r\n        <span class="amount">{{=it.data.sales_commission||\'0.00\'}}</span>\r\n    </div>\r\n</header>\r\n<section>\r\n    <ul class="list-col2 clearfix level-box">\r\n        <li><a><div class="gray f12">一级佣金</div><div class="f16">￥{{=it.data.level1Income||\'0.00\'}}</div> </a> </li>\r\n        <li><a><div class="gray f12">二级佣金</div><div class="f16">￥{{=it.data.level2Income||\'0.00\'}}</div></a></li>\r\n        <li><a><div class="gray f12">三级佣金</div><div class="f16">￥{{=it.data.level3Income||\'0.00\'}}</div></a></li>\r\n    </ul>\r\n</section>\r\n{{?parseFloat(it.data.sales_commission)>0}}\r\n\r\n\r\n<div style="position: relative">\r\n    {{var sec_height=document.body.clientWidth+\'px\';}}\r\n    <div id="cvs" style="height:{{=sec_height}}"></div>\r\n    <div class="cvs-text">\r\n        <span>{{=it.data.sales_commission||\'0.00\'}}</span>\r\n        <p>预计收益（元）</p>\r\n    </div>\r\n</div>\r\n{{?}}'
}),
define("apps/newoutlet/views/profit", ["backbone", "doT", "echarts", "apps/newoutlet/models/profit", "text!apps/newoutlet/templates/profit.html"],
function(t, e, i, n, r) {
    var o = $("#views");
    return t.View.extend({
        className: "page-view page-o-amount",
        template: e.template(r),
        events: {},
        initialize: function() {
            this.model = new n,
            this.listenTo(this.model, "sync", this.render)
        },
        render: function() {
            o.html(this.$el.html(this.template(this.model.toJSON())));
            var t = this.model.get("data");
            if (parseFloat(t.sales_commission) > 0) {
                var e = echarts.init(document.getElementById("cvs")),
                i = {
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br>{b} : {d}%",
                        backgroundColor: "#cc3333",
                        borderWidth: 0,
                        borderRadius: 4
                    },
                    toolbox: {
                        show: !1,
                        feature: {
                            mark: {
                                show: !0
                            },
                            dataView: {
                                show: !0,
                                readOnly: !1
                            },
                            magicType: {
                                show: !0,
                                type: ["pie", "funnel"]
                            },
                            restore: {
                                show: !0
                            },
                            saveAsImage: {
                                show: !0
                            }
                        }
                    },
                    calculable: !1,
                    series: [{
                        name: "占比",
                        type: "pie",
                        radius: [70, 85],
                        x: "60%",
                        width: "40%",
                        funnelAlign: "right",
                        data: [{
                            value: parseFloat(t.level3Income),
                            name: "三级佣金",
                            itemStyle: {
                                normal: {
                                    color: "#ff6600"
                                }
                            }
                        },
                        {
                            value: parseFloat(t.level2Income),
                            name: "二级佣金",
                            itemStyle: {
                                normal: {
                                    color: "#ffcc00"
                                }
                            }
                        },
                        {
                            value: parseFloat(t.level1Income),
                            name: "一级佣金",
                            itemStyle: {
                                normal: {
                                    color: "#69c"
                                }
                            }
                        }]
                    }]
                };
                e.setOption(i)
            }
            return $(".loading").hide(),
            this
        }
    })
}),
define("apps/newoutlet/router", ["backbone", "core/common", "apps/newoutlet/models/apply", "apps/newoutlet/views/apply", "apps/newoutlet/views/order", "apps/newoutlet/views/team", "apps/newoutlet/views/money", "apps/newoutlet/views/center", "apps/newoutlet/views/cash", "apps/newoutlet/views/income", "apps/newoutlet/views/ranks", "apps/newoutlet/views/levels", "apps/newoutlet/views/inform", "apps/newoutlet/views/profit"],
function(t, e, i, n, r, o, s, a, l, h, c, d, u, p) {
    var f = t.Router.extend({
        routes: {
            "": "index",
            center: "center",
            team: "team",
            order: "order",
            money: "money",
            cash: "cash",
            income: "income",
            ranks: "ranks",
            levels: "levels",
            inform: "inform",
            profit: "profit",
            "*path": "index"
        },
        index: function() {
            var t = new n;
            t.model.fetch()
        },
        center: function() {
            return "undefined" == typeof _global.did || 0 == _global.did ? (window.location.href = _global.url.base, !1) : (this.model = new i, void this.model.fetch({
                success: function(e, i) {
                    if (1001 != i.code) t.history.navigate("", {
                        trigger: !0
                    });
                    else {
                        var n = new a(i);
                        n.model.fetch()
                    }
                }
            }))
        },
        order: function() {
            $(".loading").show(),
            this.check();
            var t = new r;
            t.render()
        },
        money: function() {
            $(".loading").show(),
            this.check();
            var t = new s;
            t.model.fetch()
        },
        team: function() {
            $(".loading").show(),
            this.check();
            var t = new o;
            t.render()
        },
        cash: function() {
            $(".loading").show(),
            this.check();
            var t = new l;
            t.render()
        },
        income: function() {
            $(".loading").show(),
            this.check();
            var t = new h;
            t.render()
        },
        ranks: function() {
            $(".loading").show(),
            this.check();
            var t = new c;
            t.render()
        },
        levels: function() {
            $(".loading").show(),
            this.check();
            var t = new d;
            t.render()
        },
        inform: function() {
            $(".loading").show(),
            this.check();
            var t = new u;
            t.render()
        },
        profit: function() {
            $(".loading").show(),
            this.check();
            var t = new p;
            t.model.fetch()
        },
        check: function() {
            return "undefined" == typeof _global.did || 0 == _global.did ? (window.location.href = _global.url.base, !1) : (this.model = new i, void this.model.fetch({
                success: function(e, i) {
                    return 1001 == i.code ? i: void t.history.navigate("", {
                        trigger: !0
                    })
                },
                fail: function() {}
            }))
        }
    });
    new f,
    t.history.start()
});