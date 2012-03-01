/**
 * Copy of the vala Gdl example in seed http://live.gnome.org/Vala/GdlSample
 *
 * needs this gir to work...  https://github.com/roojs/gir-1.1/blob/master/Gdl-3.gir
 */

Gtk = imports.gi.Gtk;
Gdl = imports.gi.Gdl;



var MainWindow = new GType({
    parent: Gtk.Window.type,
    name: "MainWindow",
    init : function()    {
        print("init?");
        var _t = this;
        var props = {
            
            master : false,
            layout : false,

            save_layout_cb : function () {
                print("Make dialog");
                var dialog = new Gtk.Dialog( );
                print("Made dialog");
                dialog.title = "New Layout";
                dialog.add_button("OK", Gtk.ResponseType.OK);
                 
                var hbox = new Gtk.HBox.c_new (false, 8);
                
                
                hbox.border_width = 8;
                dialog.get_content_area ().pack_start (hbox, false, false, 0);

                var label = new Gtk.Label.c_new ("Name:");
                hbox.pack_start (label, false, false, 0);

                var entry = new Gtk.Entry ();
                hbox.pack_start (entry, true, true, 0);
  
                hbox.show_all ();
                    
                var response = dialog.run ();
              
                if (response == Gtk.ResponseType.OK) {
                    print(entry.get_text());
                    _t.layout.save_layout (entry.get_text());
                }
                dialog.destroy ();
            },

            run_layout_manager_cb : function() {
                this.layout.run_manager ();
            },

            button_dump_cb : function() {
                try {
                    this.layout.save_to_file ("layout.xml");
                } catch (  e) {
                    stderr.printf ("%s\n", e.message);
                }
            },

            create_style_button : function (box,group,style, style_text)
            {
                var button = new Gtk.RadioButton.with_label_from_widget (group, style_text);
                button.show ();
                button.active = (this.master.switcher_style == style);
                var _t = this;
                button.signal.toggled.connect (function() {
                    if (button.active) {
                        _t.master.switcher_style = style;
                    }
                });
                box.pack_start (button, false, false, 0);
                return button;
            },

            create_styles_item : function (dock) {
                var vbox = new Gtk.VBox.c_new (false, 0);
                vbox.show ();

                var group;
                group = this.create_style_button (vbox, null, Gdl.SwitcherStyle.ICON, "Only icon");
                group = this.create_style_button (vbox, group, Gdl.SwitcherStyle.TEXT, "Only text");
                group = this.create_style_button (vbox, group, Gdl.SwitcherStyle.BOTH, "Both icons and texts");
                group = this.create_style_button (vbox, group, Gdl.SwitcherStyle.TOOLBAR, "Desktop toolbar style");
                group = this.create_style_button (vbox, group, Gdl.SwitcherStyle.TABS, "Notebook tabs");
                return vbox;
            },

            create_item : function (  button_title) {
                var vbox = new Gtk.VBox.c_new (false, 0);
                vbox.show ();

                var button = new Gtk.Button.with_label (button_title);
                button.show ();
                vbox.pack_start (button, true, true, 0);

                return vbox;
            },
            create_text_item : function() {
                var vbox = new Gtk.VBox.c_new (false, 0);
                vbox.show ();

                var scroll = new Gtk.ScrolledWindow.c_new  (null, null);
                scroll.show ();
                vbox.pack_start (scroll, true, true, 0);
                scroll.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
                scroll.shadow_type = Gtk.ShadowType.ETCHED_IN;
                var text = new Gtk.TextView ();
                text.wrap_mode = Gtk.WrapMode.WORD;
                text.show ();
                scroll.add (text);

                return vbox;
            }
        };
        var _t = this;
        for (var i in props) {
            this[i] = props[i];
        }
        
        this.signal.destroy.connect (Gtk.main_quit);
        this.title = "Docking widget test";
        this.set_default_size (400, 400);

        var table = new Gtk.VBox.c_new (false, 5);
        table.border_width = 10;
        this.add (table);

        var dock = new Gdl.Dock ();
        this.master = dock.master;
        this.layout = new Gdl.DockLayout.c_new (dock);

        var dockbar = new Gdl.DockBar.c_new (dock);
        dockbar.set_style ( Gdl.DockBarStyle.TEXT);
        dockbar.show();
        var box = new Gtk.HBox.c_new (false, 5);
        table.pack_start (box, true, true, 0);

        box.pack_start (dockbar, false, false, 0);
        box.pack_end (dock, true, true, 0);
         
         
        var item1 = new Gdl.DockItem.c_new ("item1", "Item #1", Gdl.DockItemBehavior.LOCKED);
        
        item1.add (this.create_text_item ());
        dock.add_item (item1, Gdl.DockPlacement.TOP);
        item1.show ();

        var item2 = new Gdl.DockItem.with_stock ("item2",
                         "Item #2: Select the switcher style for notebooks",
                         Gtk.STOCK_EXECUTE, Gdl.DockItemBehavior.NORMAL);
        item2.resize = false;
        item2.add (this.create_styles_item (dock));
        dock.add_item (item2, Gdl.DockPlacement.RIGHT);
        item2.show (); 
        
        
        
        var item3 = new Gdl.DockItem.with_stock  ("item3",
                         "Item #3 has accented characters ( )",
                         Gtk.STOCK_CONVERT,
                         Gdl.DockItemBehavior.NORMAL | Gdl.DockItemBehavior.CANT_CLOSE);
        item3.add (this.create_item ("Button 3"));
        dock.add_item (item3, Gdl.DockPlacement.BOTTOM);
        item3.show ();

        var items = []
        items[0] = new Gdl.DockItem.with_stock ("Item #4", "Item #4",
                                            Gtk.STOCK_JUSTIFY_FILL,
                                            Gdl.DockItemBehavior.NORMAL |
                                            Gdl.DockItemBehavior.CANT_ICONIFY);
        items[0].add (this.create_text_item ());
        items[0].show ();
        dock.add_item (items[0], Gdl.DockPlacement.BOTTOM);
        for (var  i = 1; i < 3; i++) {
           var name = "Item #"+ ( i + 4);
            items[i] = new Gdl.DockItem.with_stock (name, name, Gtk.STOCK_NEW,
                                                Gdl.DockItemBehavior.NORMAL);
            items[i].add (this.create_text_item ());
            items[i].show ();

            items[0].dock (items[i], Gdl.DockPlacement.CENTER, null);
        }

        item3.dock_to (item1, Gdl.DockPlacement.TOP, -1);

        item2.dock_to (item3, Gdl.DockPlacement.RIGHT, -1);

        item2.dock_to (item3, Gdl.DockPlacement.LEFT, -1);

        item2.dock_to (null, Gdl.DockPlacement.FLOATING, -1);
        box = new Gtk.HBox.c_new (true, 5);
        table.pack_end (box, false, false, 0);

        var button = new Gtk.Button.from_stock (Gtk.STOCK_SAVE);
        button.signal.clicked.connect (function () { _t.save_layout_cb() });
        box.pack_end (button, false, true, 0);

        button = new Gtk.Button.with_label ("Layout Manager");
        button.signal.clicked.connect (function () { _t.run_layout_manager_cb() });
        box.pack_end (button, false, true, 0);

        button = new Gtk.Button.with_label ("Dump XML");
        button.signal.clicked.connect(function () { _t.button_dump_cb(); });
        box.pack_end (button, false, true, 0);

        new Gdl.DockPlaceholder.c_new ("ph1", dock, Gdl.DockPlacement.TOP, false);
        new Gdl.DockPlaceholder.c_new ("ph2", dock, Gdl.DockPlacement.BOTTOM, false);
        new Gdl.DockPlaceholder.c_new ("ph3", dock, Gdl.DockPlacement.LEFT, false);
        new Gdl.DockPlaceholder.c_new ("ph4", dock, Gdl.DockPlacement.RIGHT, false);

    },
 
    
});



Gtk.init (null,null);

var win = new MainWindow ();
win.show_all ();

print('main');
Gtk.main ();
