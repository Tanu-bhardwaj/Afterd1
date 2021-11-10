Ext.application({
    name: 'Fiddle',

    launch: function () {
        //write your code here
        var filterPanel = Ext.create('Ext.panel.Panel', {
            bodyPadding: 5, // Don't want content to crunch against the borders

            title: '<div style="text-align:center;">Movie Avance Search</div>',
            renderTo: Ext.getBody(),
            layout: 'hbox',
            border: 0,
            items: [{
                xtype: 'textfield',
                labelWidth: 80,
                //name: 'name',
                fieldLabel: 'Movie_Name',
                //bodyStyle: 'margin: 30px;'
                margin: '5 25 0 500'

            }, {
                xtype: 'textfield',

                fieldLabel: 'Director_Name',
                margin: '5 0 0 0'

            }]

        });
        var filterPanel_2 = Ext.create('Ext.panel.Panel', {
            bodyPadding: 5, // Don't want content to crunch against the borders

            renderTo: Ext.getBody(),
            layout: 'hbox',
            border: 0,
            items: [{
                    xtype: 'datefield',
                    // labelStyle: 'width:5px',

                    labelWidth: 80,
                    //name: 'name',
                    fieldLabel: 'Relase_year',
                    margin: '5 20 0 500'

                    //allowBlank: false  // requires a non-empty value
                }, {
                    /// combobox of search type
                    xtype: 'combo',
                    margin: '5 28 0 6',
                    fieldLabel: 'Language:',
                    // labelStyle: 'width:30px',
                    //width: 200,
                    //padding: 10,
                    // value: 'select..',
                    emptyText: ' select',

                    store: new Ext.data.SimpleStore({

                        //// choice for combobox
                        data: [
                            [0, 'English'],
                            [1, 'Hindi'],
                            [2, 'German']
                        ],
                        id: 0,
                        fields: ['value', 'text']
                    }),
                    valueField: 'value',
                    displayField: 'text',

                    listeners: {
                        change: function (combo, newValue, oldValue) {

                        }
                    }
                }

            ]

        });
        var filterPanel_3 = Ext.create('Ext.panel.Panel', {
            bodyPadding: 5, // Don't want content to crunch against the borders

            renderTo: Ext.getBody(),
            layout: 'hbox',
            border: 0,
            items: [{
                xtype: 'button',
                text: 'Search',
                margin: '0 6 0 730'
            }, {
                xtype: 'button',
                text: 'Reset'
            }]

        });
        Ext.define('User', {
            extend: 'Ext.data.Model',
            fields: ['film_id', 'Title', 'Description', 'Director', 'language_name', 'Year', 'Rating', 'Special_Features']
        });

        var userStore = Ext.create('Ext.data.Store', {
            model: 'User',

            pageSize: 10,
            proxy: {
                type: 'ajax',
                url: 'http://localhost:8080/fisrtEclipse/DummyServlet',
                reader: {
                    type: 'json',
                    rootProperty: 'films',
                },
             params:{
	          start:0,
              limit:10
               },
                noCache: false
            },
            autoLoad: true,
        });
        userStore.load();
        Ext.create('Ext.grid.Panel', {
            renderTo: Ext.getBody(),
            store: userStore,
            id: 'Movie_grid',

            title: 'Movie grid',
            selModel: {
                type: 'checkboxmodel'
            },
            columns: [

                {
	// scorll bar for more rows
                    text: 'Title',

                    sortable: false,
                    hideable: false,
                    dataIndex: 'Title',
                    flex: 1

                }, {
                    text: 'Description',

                    dataIndex: 'Description',
                    flex: 1
                        // hidden: true
                }, {
                    text: 'Director',

                    dataIndex: 'Director',
                    flex: 1
                        // hidden: true
                }, {
                    text: 'language_name',

                    dataIndex: 'language_name',
                    flex: 1
                        // hidden: true
                }, {
                    text: 'Release year',

                    dataIndex: 'Year',
                    flex: 1
                        // hidden: true
                },

                {
                    text: 'Rating',

                    dataIndex: 'Rating',
                    flex: 1
                        // hidden: true
                },

                {
                    text: 'Special_Features',
                    flex: 1,
                    dataIndex: 'Special_Features',

                }
            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'pagingtoolbar',
                    store: userStore, // same store GridPanel is using
                    displayInfo: false,
                    margin: '0 120 0 0',
                }, {
                    xtype: 'button',
                    text: 'Add',
                    handler: function () {
                        var add_form = Ext.create('Ext.window.Window', {
                            title: 'Add Film',
                            height: 510,
                            width: 500,
                            items: {
                                xtype: 'form',
                               
                                items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Movie Name',
                                    id: 'one',
                                    padding: 10,
                                    width: 470,
                                    //margin : '10 0 0 350',
                                    name: 'title',
                                    //enableKeyEvents: true
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Release Year',
                                    padding: 10,
                                    id: 'two',
                                    width: 470,
                                    //margin: '10 0 0 100',
                                    name: 'releaseyear',
                                    // enableKeyEvents: true
                                }, {
                                    xtype: 'combo',
                                    fieldLabel: 'Special Feature',
                                    store: ['Trailers', 'Commentaries', 'Deleted Scenes', 'Behind the Scenes'],
                                    width: 470,
                                    id: 'three',
                                    padding: 10,
                                    valueField: 'feature',
                                    displayField: 'featurename',
                                    name: 'namefeature'
                                        //margin: '25 0 0 100',
                                }, {
                                    xtype: 'combobox',
                                    id: 'four',
                                    fieldLabel: 'Rating',
                                    padding: 10,
                                    width: 470,
                                    store: Ext.create('Ext.data.Store', {

                                        fields: ['rating', 'ratingmovies'],
                                        data: [{
                                            'rating': 'g',
                                            'ratingmovies': 'G'
                                        }, {
                                            'rating': 'pg',
                                            'ratingmovies': 'PG'
                                        }, {
                                            'rating': 'pg-13',
                                            'ratingmovies': 'PG-13'
                                        }, {
                                            'rating': 'r',
                                            'ratingmovies': 'R'
                                        }]
                                    }),
                                    valueField: 'rating',
                                    displayField: 'ratingmovies',
                                    name: 'ratings'
                                        //margin: '25 0 0 100',
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Language',
                                    id: 'five',
                                    padding: 10,
                                    width: 470,
                                    store: Ext.create('Ext.data.Store', {

                                        fields: ['language', 'languagemovie'],
                                        data: [{
                                            'language': '1',
                                            'languagemovie': '1'
                                        }, {
                                            'language': '2',
                                            'languagemovie': '2'
                                        }]
                                    }),
                                    valueField: 'language',
                                    displayField: 'languagemovie',
                                    name: 'language_id'
                                        //margin: '25 0 0 100',
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Director Name',
                                    id: 'six',
                                    padding: 10,
                                    width: 470,
                                    name: 'director'
                                        //margin: '10 0 0 100',
                                        //name: 'title',
                                        // enableKeyEvents: true
                                }, {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Description',
                                    id: 'seven',
                                    padding: 10,
                                    hight: 50,
                                    width: 470,
                                    name: 'description'
                                        //margin: '10 0 0 100',
                                        //name: 'title',
                                        // enableKeyEvents: true
                                }],
                                buttons: [{
                                    text: 'Save',
                                    margin: '0 10 0 0',
                                    handler: function () {
                                        Ext.Ajax.request({
                                            url: 'http://localhost:8080/fisrtEclipse/Add', //Defined path of function defined in MVC 
                                            method: 'POST', // controller
                                            params: {
                                                Title: Ext.getCmp('one').value,
                                                Description: Ext.getCmp('seven').value,
                                                Director: Ext.getCmp('six').value,
                                                language_id: Ext.getCmp('five').value,
                                                Year: Ext.getCmp('two').value,
                                                Rating: Ext.getCmp('four').value,
                                                Special_Features: Ext.getCmp('three').value
                                            },
                                            success: function () {
                                                add_form.destroy();
                                                Ext.Msg.alert("Data Added Succesfully");

                                            },
                                            failure: function () {
                                                alert('fail');
                                            }

                                        });

                                    }
                                }, {
                                    text: 'Cancel',
                                    margin: '0 160 0 0',
                                    handler: function () {
                                        this.up('form').getForm().reset();
                                    }
                                }]
                            }
                            //.show();
                        }).show();
                    }
                }, {
                    xtype: 'button',
                    text: 'Edit',
                    handler: function () {
                        var selectionModel = Ext.getCmp('Movie_grid').getSelectionModel();
                        var selectedRecords = selectionModel.getSelection();
                        var myvalue = selectedRecords[0];
                        var edit_form = Ext.create('Ext.window.Window', {
                            title: 'Edit Film',
                            height: 510,
                            width: 500,

                            items: {
                                xtype: 'form',
                               
                                id: 'edit_form',
                                //layout: 'fit',
                                //formpanel.show();
                                items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Movie Name',
                                    padding: 10,
                                    width: 470,
                                    id: 'name',
                                    value: myvalue.get('Title'),
                                    //margin : '10 0 0 350',
                                    name: 'title',
                                    //enableKeyEvents: true
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Release Year',
                                    padding: 10,
                                    width: 470,
                                    id: 'ryear',
                                    value: myvalue.get('Year'),
                                    name: 'releaseyear',
                                    // enableKeyEvents: true
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Special Feature',
                                    padding: 10,
                                    width: 470,

                                    name: 'namefeature',
                                    id: 'features',
                                    value: myvalue.get('Special_Features'),
                                    store: Ext.create('Ext.data.Store', {

                                        fields: ['feature', 'featurename'],
                                        data: [{
                                            'feature': 'action',
                                            'featurename': 'Action'
                                        }, {
                                            'feature': 'Comedy',
                                            'featurename': 'Comedy'
                                        }, {
                                            'feature': 'thriller',
                                            'featurename': 'thriller'
                                        }, {
                                            'feature': 'horror',
                                            'featurename': 'Horror'
                                        }, {
                                            'feature': 'romance',
                                            'featurename': 'Romance'
                                        }, {
                                            'feature': 'drama',
                                            'featurename': 'Drama'
                                        }, ]
                                    }),
                                    valueField: 'feature',
                                    displayField: 'featurename',

                                    //margin: '25 0 0 100',
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Rating',
                                    name: 'ratings',
                                    id: 'rate',
                                    value: myvalue.get('Rating'),
                                    padding: 10,
                                    width: 470,
                                    store: Ext.create('Ext.data.Store', {

                                        fields: ['rating', 'ratingmovies'],
                                        data: [{
                                            'rating': 'g',
                                            'ratingmovies': 'G'
                                        }, {
                                            'rating': 'pg',
                                            'ratingmovies': 'PG'
                                        }, {
                                            'rating': 'pg-13',
                                            'ratingmovies': 'PG-13'
                                        }, {
                                            'rating': 'r',
                                            'ratingmovies': 'R'
                                        }]
                                    }),
                                    valueField: 'rating',
                                    displayField: 'ratingmovies',

                                    //margin: '25 0 0 100',
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Language',
                                    id: 'lang',
                                    name: 'language_id',
                                    value: myvalue.get('language_id'),
                                    padding: 10,
                                    width: 470,
                                    store: Ext.create('Ext.data.Store', {

                                        fields: ['language', 'languagemovie'],
                                        data: [{
                                            'language': '1',
                                            'languagemovie': '1'
                                        }, {
                                            'language': '2',
                                            'languagemovie': '2'
                                        }]
                                    }),
                                    valueField: 'language',
                                    displayField: 'languagemovie',

                                    //margin: '25 0 0 100',
                                }, {
                                    xtype: 'textfield',

                                    fieldLabel: 'Director Name',
                                    id: 'dname',
                                    value: myvalue.get('Director'),
                                    padding: 10,
                                    width: 470,
                                    name: 'director'
                                        //margin: '10 0 0 100',
                                        //name: 'title',
                                        // enableKeyEvents: true
                                }, {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Description',
                                    id: 'desc',
                                    value: myvalue.get('Description'),
                                    padding: 10,
                                    hight: 50,
                                    width: 470,
                                    name: 'description',
                                    //margin: '10 0 0 100',
                                    //name: 'title',

                                }],
                                buttons: [{
                                    text: 'Save',
                                    margin: '0 10 0 0',
                                    handler: function () {
                                        Ext.getCmp('edit_form').submit({
                                            url: 'http://localhost:8080/fisrtEclipse/Edit',
											params:{
												film_id:myvalue.get('film_id'),
											},
                                            success: function () {
												userStore.reload();
                                                edit_form.destroy();
                                                Ext.Msg.alert("Data Edit Succesfully");

                                            },
                                            failure: function () {
                                                alert('fail');
                                            }
                                        })

                                    }
                                }, {
                                    text: 'Cancel',
                                    margin: '0 160 0 0',
                                    handler: function () {
                                        this.up('form').getForm().reset();
                                    }
                                }]
                            }
                            //.show();
                        }).show();
                    }

                }, {
                    xtype: 'button',
                    text: 'Delete',
                    handler: function () {
                        var selectionModel = Ext.getCmp('Movie_grid').getSelectionModel();
                        var selectedRecords = selectionModel.getSelection();
                        var myvalue = selectedRecords;
                        var arr=[];
						myvalue.forEach((value, index, array)=>{
							arr.push(value.get('film_id'));
						})
                        console.log(arr);
                        Ext.Ajax.request({
                            url: 'http://localhost:8080/fisrtEclipse/Delete', //Defined path of function defined in MVC 
                            method: 'POST', // controller
                            params: {
                                film_id: arr,
                               
                            },
                            success: function () {
								userStore.reload();
                                Ext.Msg.alert("Deleted");

                            },
                            failure: function () {
                                alert('fail');
                            }

                        });

                    }
                }],
            }],

        });

    }
});