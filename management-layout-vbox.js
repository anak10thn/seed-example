#!/usr/bin/env seed
// ibnu.yahya@toroo.org

Gtk = imports.gi.Gtk;
Gtk.init(null,null);

box = new GType ({
	parent: Gtk.Window.type,
	name: "box",
	init : function(){
		wg(this);
		function wg(w) {
			w.signal.hide.connect(Gtk.main_quit);
			w.set_title("Packing and Boxing");
			w.set_default_size(300,200);
			
			var vbox = new Gtk.VBox({homogeneous:true,spacing:5});
			var hbox1 = new Gtk.HBox({homogeneous:false,spacing:5});
			var hbox2 = new Gtk.HBox({homogeneous:true,spacing:5});
			var tombol1 = new Gtk.Button({label:"Tombol1"});
			tombol1.set_size_request(100,50);
			var tombol2 = new Gtk.Button({label:"Tombol2"});
			tombol2.set_size_request(100,50);
			var tombol3 = new Gtk.Button({label:"Tombol3"});
			tombol3.set_size_request(100,50);
			var tombol4 = new Gtk.Button({label:"Tombol4"});
			tombol4.set_size_request(100,50);
			var tombol5 = new Gtk.Button({label:"Tombol5"});
			tombol5.set_size_request(100,50);
			var tombol6 = new Gtk.Button({label:"Tombol6"});
			tombol6.set_size_request(100,50);
			
			hbox1.pack_start(tombol1);
			hbox1.add(tombol2);
			hbox1.pack_end(tombol3);
			
			hbox2.pack_start(tombol4);
			hbox2.add(tombol5);
			hbox2.pack_end(tombol6);
			
			vbox.pack_start(hbox1);
			vbox.pack_end(hbox2);
			
			w.add(vbox);
			w.show_all();
		}
	}
});

var tampil = new box();
Gtk.main();
