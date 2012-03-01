#!/usr/bin/env seed
Gtk = imports.gi.Gtk;
GObject = imports.gi.GObject;

Gtk.init(Seed.argv);


var w = new Gtk.Window();
var v = new Gtk.TreeView();

var c = new Gtk.TreeViewColumn();
var cr = new Gtk.CellRendererText();
c.pack_start(cr);
c.add_attribute(cr, "text", 0);

v.append_column(c);

var m = new Gtk.ListStore();
m.set_column_types(1, [GObject.TYPE_INT]);

var r = {};
m.append(r);
m.set_value(r.iter, 0, [GObject.TYPE_INT, 3]);
m.append(r);
m.set_value(r.iter, 0, [GObject.TYPE_INT, 2]);
m.append(r);
m.set_value(r.iter, 0, [GObject.TYPE_INT, 9]);

v.set_model(m);
w.add(v);

w.show_all();
w.resize(300, 300);

Gtk.main();
