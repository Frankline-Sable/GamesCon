// JavaScript Document
var xhtml;
xhtml = new XMLHttpRequest();
xhtml.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
        placeProductsInGrid(JSON.parse(this.responseText));
    }
};
xhtml.open("POST", "phps/loadProducts.php", true);
xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhtml.send();

var arr;

function placeProductsInGrid(dat) {
    arr = dat.PRODUCTS;
    let prod_count, out = " ", a, b, c, d, category = [];

    prod_count = arr.length;

    /*Checking the categories*/
    for (a = 0; a < prod_count; a++) {
        c = true;
        for (b = 0; b < category.length; b++) {
            if (arr[a].pd_categ === category[b]) {
                c = false;
            }
        }
        if (c)
            category.push(arr[a].pd_categ);
    }

    var e, per_row;
    category.sort();
    for (d = 0; d < category.length; d++) {
        out += '<div id="' + category[d] + '" class="w3-padding-32"></div>';
        // out += "top top";
        out += '<article>\n' +
            '        <h4 class="w3-xlarge w3-text-white" style="text-shadow: 2px 2px 0 #444;border: 1px solid rgb(244, 67, 54); border-style: double  dashed dotted ">' + category[d] + ' <div class="w3-right" style="padding:0 8px; color: rgba(244, 67, 54,.7)"><i class="fa fa-gamepad"></i> </div></h4>\n' +
            '\n' +
            '        <div class="w3-row">';
        per_row = 2;
        for (e = 0; e < prod_count; e++) {

            if (arr[e].pd_categ !== category[d]) {
                continue;
            }

            if (per_row === 2) {
                out += '<div class="w3-col l3 s6 w3-padding-small">';
            }
            out += '                    <div class="w3-hover-shadow w3-red w3-border-red" style="padding-bottom: 18px;border: 5px ridge">\n' +
                '                        <div class="w3-display-container w3-hover-opacity">\n' +
                '                            <img src="' + arr[e].pd_pic + '" style="width:100%;" class="w3-hover-sepia">\n' +
                '                            <span class="w3-tag w3-display-topleft"></span>\n' +
                '                                <div class="w3-display-middle  w3-display-hover" style="z-index: 55">\n' +
                '                                    <button class="w3-btn w3-animate-zoom w3-border-red" style="background-color: rgb(244,67,54); background-color: rgba(244,67,54,.8);" onclick=\'executeTransaction(' + arr[e].pd_id + ',' + arr[e].pd_price + ',"' + arr[e].pd_title + '");\'>\n' +
                '                                        Add to cart <i class="fa fa-shopping-cart"></i></button>\n' +
                '                                </div>\n' +
                '                            <div class="w3-display-middle w3-center"\n' +
                '                                 style="background-color: rgba(244,67,54,0.25);width: 100%;height: 100%">\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <p>' + arr[e].pd_title + '<br><b class="w3-small w3-right"\n' +
                '                                                 style="text-decoration: rgba(244,67,54,0.5) underline;">Kshs. ' + arr[e].pd_price + '</b></p>\n' +
                '                    </div>\n' +
                '                    <br>\n';
            per_row--;

            if (per_row < 1) {
                out += '</div>';
                per_row = 2;
            }


        }
        out += '</div>\n' +
            '        </article>';
    }


    var x = document.getElementById("products-panel");
    x.innerHTML = out;

}


var prod_Cart = 0, cart = document.getElementById("cartCount"), contentsDisp = document.getElementById("cart_contents");
var cart_Contents = [], grp1 = [], grp2 = [];


function executeTransaction(id, price, title) {
    if (usernameFromSession === undefined) {
        userAside_Open();

        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 5000);

        return;
    }
    _addCart(id);
    saveAsBought(id, price, title);
}


function _addCart(id) {

    prod_Cart++;
    var i, j, store = 0, k;

    if (cart_Contents.indexOf(id) > -1) {
        grp1.push(id);
        for (k = 0; k < grp1.length; k++) {
            if (grp1[k] == id) {
                store++;
            }
        }
        grp1.push(store);
    }
    else {
        cart_Contents.push(id);
    }

    if (cart_Contents.length < 1) {
        cart_Contents.push(id);
    }

    cart.className = cart.className.replace("w3-light-gray", "w3-red");
    cart.innerHTML = prod_Cart;

    var out = "<ul class='w3-ul w3-padding-0 '>", x, y, ccount;
    for (i = 0; i < cart_Contents.length; i++) {
        ccount = 1;
        for (j = 0; j < arr.length; j++) {
            if (arr[j].pd_id == cart_Contents[i]) {
                if ((grp1.indexOf(cart_Contents[i])) > -1) {
                    for (x = 0; x < grp1.length; x++) {
                        if (cart_Contents[i] == grp1[x]) {
                            ccount++;
                        }
                    }
                    out += '<span class="w3-tag w3-left w3-padding-0 w3-green" style="font-size:9px;">' + ccount + '</span><li>' + (arr[j].pd_title).slice(0, 10) + '.. <span onClick="javascript:removeFromCart(' + ccount + ',' + cart_Contents[i] + ');" class="fa fa-close w3-text-red w3-right">x</span></li>';

                }
                else {
                    out += '<span class="w3-tag w3-left w3-padding-0 w3-green" style="font-size:9px;">1</span><li>' + (arr[j].pd_title).slice(0, 10) + '.. <span onClick="javascript:removeFromCart(1,' + cart_Contents[i] + ');" class="fa fa-close w3-text-red w3-right">x</span></li>';

                }
            }
        }
    }

    out += "</ul>";
    contentsDisp.innerHTML = out;
}

function removeFromCart(cnt, id) {


    removeFromBought(id);
    delete cart_Contents[cart_Contents.indexOf(id)];
    prod_Cart = prod_Cart - cnt;
    cnt = 0;

    if (prod_Cart < 1) {
        cart.className = cart.className.replace("w3-red", "w3-light-gray");
        prod_Cart = 0;
    }
    cart.innerHTML = prod_Cart;

    var out = "<ul class='w3-ul w3-padding-0 '>", x, i, j, ccount;

    for (i = 0; i < cart_Contents.length; i++) {
        ccount = 1;
        for (j = 0; j < arr.length; j++) {
            if (arr[j].pd_id == cart_Contents[i]) {
                if (cart_Contents[i] != undefined) {
                    if ((grp1.indexOf(cart_Contents[i])) > -1) {
                        for (x = 0; x < grp1.length; x++) {
                            if (cart_Contents[i] == grp1[x]) {
                                ccount++;
                            }
                        }
                        out += '<span class="w3-tag w3-left w3-padding-0 w3-green" style="font-size:9px;">' + ccount + '</span><li>' + (arr[j].pd_title).slice(0, 10) + '.. <span onClick="javascript:removeFromCart(' + ccount + ',' + cart_Contents[i] + ');" class="fa fa-close w3-text-red w3-right">x</span></li>';

                    }
                    else {
                        out += '<span class="w3-tag w3-left w3-padding-0 w3-green" style="font-size:9px;">1</span><li>' + (arr[j].pd_title).slice(0, 10) + '.. <span onClick="javascript:removeFromCart(1,' + cart_Contents[i] + ');" class="fa fa-close w3-text-red w3-right">x</span></li>';
                    }
                } else {
                    alert("errpr");
                }
            }
        }
    }

    out += "</ul>";
    contentsDisp.innerHTML = out;
}

function saveAsBought(id, price, name) {

    let xhtml;
    xhtml = new XMLHttpRequest();
    xhtml.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            //successful record insertion into the bought items database
        }
    };
    xhtml.open("POST", "phps/ManageCartItems.php", true);
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhtml.send("id=" + id + "&name=" + name + "&price=" + price + "&shopper=" + usernameFromSession + "&operation=" + true);
}

function removeFromBought(id) {
    let xhtml;//alright
    xhtml = new XMLHttpRequest();
    xhtml.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            //successful record deletion from bought items database
        }
    };
    xhtml.open("POST", "phps/ManageCartItems.php", true);
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (id === null) {
        xhtml.send("id=" + id + "&operation=" + false + "&shopper=" + usernameFromSession + " &all=" + true);
    }
    else {
        xhtml.send("id=" + id + "&operation=" + false + "&shopper=" + usernameFromSession + " &all=" + false);
    }
    loadTable();
}


function loadTable() {
    if (usernameFromSession === undefined)
        return;
    let xhtml;
    xhtml = new XMLHttpRequest();
    xhtml.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            try {
                placeBoughtItems(JSON.parse(this.responseText));
            }
            catch (err) {
                document.getElementById("checkOutContainer").innerHTML = '<br><h5 class="w3-center">Your cart is empty!</h5>';
            }

        }
    };
    xhtml.open("POST", "phps/loadCheckout.php", true);
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("shopper=" + usernameFromSession);

}

function placeBoughtItems(dat) {
    var arr2;
    arr2 = dat.CHECK;

    var out = "", i;

    out += ' <div class="w3-responsive" style="border: groove">\n' +
        '            <table class="w3-table-all w3-small">\n' +
        '                <tr class="w3-padding-0 w3-white cap">\n' +
        '                    <th>Copies</th>\n' +
        '                    <th>Name</th>\n' +
        '                    <th>Price</th>\n' +
        '                    <th>Average</th>\n' +
        '                    <th>Remove</th>\n' +
        '                </tr>\n';

    var total = 0;
    for (i = 0; i < arr2.length; i++) {


        average = arr2[i].pd_price * arr2[i].pd_count;
        out += ' <tr class="w3-padding-0">\n' +
            '                    <td>' + arr2[i].pd_count + '</td>\n' +
            '                    <td>' + arr2[i].pd_title + '</td>\n' +
            '                    <td>' + arr2[i].pd_price + '</td>\n' +
            '                    <td>' + average + '</td>\n' +
            '                    <td><span class="fa fa-close w3-text-white w3-text-shadow w3-medium w3-hover-opacity w3-btn w3-transparent" onclick="removeFromBought(' + arr2[i].pd_id + ')">x</span></td>\n' +
            '</tr>';
        total += average;

    }
    out += '<tr>\n' +
        '                    <td><b class="w3-medium">Total</b></td>\n' +
        '                    <td></td>\n' +
        '                    <td></td>\n' +
        '                    <td></td>\n' +
        '                    <td>Ksh. ' + total + '</td>\n' +
        '                </tr></table></div>';
    document.getElementById("checkOutContainer").innerHTML = out;
}



