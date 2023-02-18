'use strict';

const change = (file, req) => {
    const find = file.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.value;
    file.amount += req.body.value * find.price;
    file.countGoods += req.body.value;
    return JSON.stringify(file, null, 4)
};

const add = (file, req) => {
    file.contents.push(req.body)
    file.amount += req.body.price;
    file.countGoods += req.body.quantity;
    return JSON.stringify(file, null, 4);
};

const remove = (file, req) => {
    const find = file.contents.find(el => el.id_product === +req.params.id);
    file.amount -= find.price;
    file.countGoods -= find.quantity;
    file.contents.splice(file.contents.indexOf(find), 1)
    return JSON.stringify(file, null, 4)
}

module.exports = {change, add, remove}