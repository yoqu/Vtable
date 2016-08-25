# V table

> a smiple table base on [Vue.js](http://vuejs.org)

## Description
If you need a smart/rich table,probably Vtable suit you.

Vtable **include function** :
* dispaly / hidden table the specified column
* drag your column,change column order
* every filed can ASC or DESC sort.(the function dependent backend server)
* ajax request table data.

***look it*** [example](https://yoqu.github.io/Vtable/)
### screenshot
   ![Vtable](https://raw.githubusercontent.com/yoqu/Vtable/master/doc/v-table.png)
   ![Vtable](https://raw.githubusercontent.com/yoqu/Vtable/master/doc/v-table2.png)
## dependency
* **vue.js** render dom.
* **bootstrap** 
* **bootstrap** select ui render
* **jquery-ui** drag columns effect
* **loading-overlay** ajax request dispaly loading animation


## How use it?
1. import css js in **html**.
2. copy index.html grid-table javascript code to your html
```
<script tpe="text/x-template" id="grid-table">
...
</script>
```
3. import template file to your html(/v-table-template.html)
```
<v-table
    :data="gridPage"
    :ax="ax"
    :filters="filters"
    :columns.sync="gridColumns">
            </v-table>

```

3. write js in  project.
```
new Vue({
        el: '#demo',
        data: {
            sortColumns: [],
            ax: "http://10.210.36.109:8080/v1/user",//ajax request url.
            filters: { //request's parameters
                page:"0",//init page
                sortKey:"id",//init
                sortRule:"DESC",
            },
            gridColumns: [ 'name','id', "fullName", "mobileUserFlag", "adminUserFlag", "transporterAdminFlag"],//table column order
            gridPage: {
                currentPage: 1,
                totalPage: 1,
                totalRecord: 3,
                limit: 10,
                orderGridDtoList: []//datas ,the data key must include gridColumns values.
            }
        }
    })
```

> power design : [yoqu](http://www.yoqu.org)
