const baseUrl = 'https://thilaa.jethitech.com/api/';
import instance from "./httpInterceptor";


export const getProductList = () => {
  const url = `${baseUrl}products`;
  return instance.get(url);
};
export const addProducts = (data) => {
  const url = `${baseUrl}products`;
  return instance.post(url,data);
};

export const getCategories = () => {
  const url = `${baseUrl}get-categories`;
  return instance.get(url);
}

export const updateProducts = (data) => {
  const url = `${baseUrl}products/${data?.id}`;
  return instance.post(url,{name:data?.name,category_id:data?.category_id,price:data?.price,sku:data?.sku,stock_quantity:data?.stock_quantity,pricing_type:data?.pricing_type});
};
export const getProductDetails = (id) => {
  const url = `${baseUrl}products/${id}`;
  return instance.get(url);
};
export const deleteProduct = (id) => {
  const url = `${baseUrl}products/${id}`;
  return instance.delete(url);
};
