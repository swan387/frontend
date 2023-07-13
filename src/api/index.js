import { request } from "@/utils/request";

export function getList() {
    return request({
        url: '/get_list',
        method: 'get',
    });
}


export function createPDF(item_object) {
    // e.g.
    // item_object = {
    //     po_number: "10132007",
    //     sku_number: "164549",
    //     Quantity: "18900.000",
    //     Status: "REL"
    // }
    return request({
        url: '/create_pdfs',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(item_object)
    });
}


export function getPDF(file_name) {
    return request({
        url: '/output/' + file_name,
        method: 'get',
        headers: {
            'Content-Type': 'application/pdf'
        }
    });
}

