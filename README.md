# V table

> a smiple table base on [Vue.js](http://vuejs.org)

## Description
If you need a smart/rich table,probably Vtable suit you.

Vtable **include function** :
* dispaly / hidden table the specified column
* drag your column,change column order
* every filed can ASC or DESC sort.(the function dependent backend server)
* ajax request table data.
* ajax search the data

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
                    :fields="fields" <!--this field use to add table modal.-->
                    :columns.sync="gridColumns">
            </v-table>

```

3. write js in  project.
```
var demo = new Vue({
        el: '#demo',
        data: {
            ax: "user.json",//"http://10.210.36.132:8080/v1/user",//ajax url
            filters: {
                page: "0",//init page
                sortKey: "id",//init
                sortRule: "DESC",//sort rule DESC or ASC
                hiddenColumns: ["name", "id"],//hidden the columns.
            },
            fields: {
                name: {
                    type: "input",
                    text: "Name",
                    status: "normal",
                },
                 time: {
                    type: "datepicker",
                    text: "Date select",
                    status: "normal",
                },

                id: {
                    type: "input",
                    status: "normal",
                    text: "Id",
                },
                fullName: {
                    type: "input",
                    status: "normal",
                    text: "FullName"
                },
                mobileUserFlag: {
                    type: "select",
                    status: "normal",
                    data: [
                        {
                            value: "1",
                            text: "select1"
                        }, {
                            value: "2",
                            text: "select2"
                        }
                    ],
                    text: "MobileUserFlag"
                },
                checkBox: {
                    text:"CheckBox",
                    type: "checkBox",
                    status: "normal",
                    data: [
                        {
                            text: "c1",
                            value: 1,
                        },
                        {
                            text: "c2",
                            value: 3,
                        },
                        {
                            text: "c3",
                            value: 6,
                        }
                    ],
                    value: []
                }
            },
            gridColumns: ['name', 'id', "fullName", "mobileUserFlag", "adminUserFlag", "transporterAdminFlag"],
            gridPage: {
                currentPage: 1,
                totalPage: 1,
                totalRecord: 3,
                limit: 10,
                orderGridDtoList: []//the data array
            }
        }
    })
```
config fields,you can define custom field to the form.

> power design : [yoqu](http://www.yoqu.org)
