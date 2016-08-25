/**
 * Created by yoqu on 16/8/25.
 */
Vue.directive('inarray',
    function (data) {
        var result = $.inArray(data['data'], data['colums']);
        if (result == -1) {
            this.el.style.display = "none";
        } else {
            this.el.style.display = "table-cell";
        }
    }
)
Vue.directive('sortable', {
    bind: function () {
        $(this.el).sortable({
            handle: '.some-handle'
        }).bind('sortupdate', function () {
            var columns = new Array();
            $(this).children("th").each(function (i) {
                columns[i] = $.trim($(this).attr("th-value"));
            });
            demo.gridColumns = columns;
        });
    },
});
Vue.directive('select_column', {
    twoWay: true,
    bind: function () {
        var self = this;
        $(this.el).on("change", function () {
            console.log("bind select columns");
            console.log($(this).val());
            self.set($(this).val());
        });
    },
});
var table = Vue.component('v-table', {
    template: '#grid-table',
    props: {
        data: Object,
        columns: Array,
        ax: String,
        filters:Object,
    },
    data: function () {
        var sortOrders = {}
        var sortColumns = new Array();
        var pagenative = new Array();
        this.columns.forEach(function (key, index) {
            sortOrders[key] = 1
            sortColumns[index] = key
        })
        if(this.filters=="" || this.filters==null){
            console.log("filters init null");
            filters={
                page:0,
            };
        }
        return {
            sortKey: '',
            sortOrders: sortOrders,
            sortColumns: sortColumns,
            pagenative: pagenative
        }
    },
    methods: {
        bind: function () {
            binddragTable();
        },
        sortBy: function (key) {
            this.filters['sortKey']=key;
            // console.log()
            if(this.sortOrders[key]!=-1){
                this.filters['sortRule']="ASC";
            }else{
                this.filters["sortRule"]="DESC";
            }
            this.sortKey = key
            this.sortOrders[key] = this.sortOrders[key] * -1
            this.pageing(this.filters['page']);
        },
        pageing: function (page) {
            //if page not correct return ;
            if (page <= 0 || page > this.data.totalPage) {
                return;
            }
            if (this.ax == null || this.ax == "") {
                alert("ajax url must define");
                return;
            }
            var self = this;
            var parameters="?vtable-version=1.0";
            this.filters['page']=page;
            if(this.filters!=null && this.filters!=""){
                for(key in this.filters){
                    parameters+="&"+key+"="+this.filters[key];
                }
            }
            // console.log(parameters);
            var url = this.ax+parameters;
            $.ajax({
                dataType: "json",
                type: "get",
                url: url,
                success: function (data) {
                    // console.log(data);
                    self.pagenative = new Array();
                    self.data = data;
                    var hideE = false;
                    var suoyin = 0;
                    self.pagenative = new Array(self.data.totalPage);
                    for (var index = 0; index < self.data.totalPage; index++) {
                        if (self.data.totalPage > 6) {
                            if (index + 1 == self.data.currentPage) {
                                obj = new Object();
                                obj.active = true;
                                obj.page = index + 1;
                                self.pagenative[suoyin++] = obj;
                                hideE = false;
                            } else if (Math.abs(index + 1 - self.data.currentPage) < 3
                                || index == 0 || index + 1 == self.data.totalPage) {
                                obj = new Object();
                                obj.active = false;
                                obj.page = index + 1;
                                self.pagenative[suoyin++] = obj;
                                hideE = false;
                            } else if (!hideE) {
                                obj = new Object();
                                obj.active = false;
                                obj.page = -1;
                                self.pagenative[suoyin++] = obj;
                                hideE = true;
                            }
                        } else {
                            if (index + 1 == self.data.currentPage) {
                                self.pagenative[index] = {
                                    active: true,
                                    page: index + 1,
                                }
                            } else {
                                self.pagenative[index] = {
                                    active: false,
                                    page: index + 1,
                                }
                            }
                        }
                    }
                },
                error:function(data){
                    if(self.ax=="" || self.ax==null){
                        alert("Please enter your ajax url.");
                    }else{
                        alert("request have a exception,Please confirm enter ajax url correct or logged system?");
                    }
                },
                beforeSend: function () {
                    $("#v-table").loadingOverlay();
                },
                complete: function (XMLHttpRequest, status) {
                    $("#v-table").loadingOverlay("remove");
                    if (status == 'timeout') { // 超时,status还有success,error等值的情况
                        alert("time out");
                    }
                },
            });
        }
    },
    watch: {
        "columns": function (val, oldVal) {
            //if chang column sort update selectpicker.
            $('.selectpicker').selectpicker('refresh');
        }
    },
    ready: function () {
        this.pageing(1);
    },
})