import { productModel } from "../../dao/models/product.model.js"
export default class ProductService {
    getAll =  async  (req) =>{
        try {
            // valores por default
            const dlimit = 3;
            const dpage = 1;
            // asignación de valores
            const limit = req.query.limit ? parseInt(req.query.limit) : dlimit;
            const qpage = req.query.page ? parseInt(req.query.page) : dpage;
            const sort = req.query.sort ? {price: req.query.sort} : {};
            const query = req.query.query ? {category : req.query.query} : {};
            
            let products = await productModel.paginate(query,{limit : limit, page: qpage, sort : sort, lean : true})
            const {docs, totalPages, page,  hasPrevPage, hasNextPage, prevPage, nextPage} = products;
            const response = {
                                status : 'success', 
                                payload : docs, 
                                totalPages : totalPages, 
                                prevPage : prevPage, 
                                nextPage : nextPage,
                                page : page,
                                hasPrevPage : hasPrevPage,
                                hasNextPage : hasNextPage,
                            };
                            response.prevLink = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}`: null;
                            response.nextLink = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}`: null;
           
           
        return response;  
        } catch (error) {
            console.error('No se pudo obtener los productos desde Mongoose' + error)
        }
       
    }
    getById = async (pid) => {
        try {
            const product = await productModel.findOne({_id : {$eq: pid}});
            return product;
        } catch (error) {
            console.log("No se ha encontrado el producto o hay un fallo en el modelo")
        }
    }

    createProduct = async(newProduct) => {
        try {
            const products = await productModel.create(newProduct);
            console.log(products);
            return products;  
        } catch (error) {
            console.error('Producto NO agregado a Mongoose ' + error)
        }
       
    }

    updateProduct = async(pid, changes) => {
        const confirm = await productModel.updateOne({_id: pid}, changes);
        const added = confirm.acknowledged !== false;
        if (added) {
            const updatedProduct = await productModel.find({_id: {$eq: pid}}).lean()
            return {confirm, added, updatedProduct};
        }
        else return {confirm, added}
    }

    deleteProduct = async(pid) => {
        try {
            const delProduct = await productModel.find({_id: pid}).lean();
            const confirm = await productModel.deleteOne({_id: pid});
            return {delProduct, confirm};
        } catch (error) {
            console.error('Error al eliminar el producto, entre service y model: ' + error)
        }
      
    }
}
