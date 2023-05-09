import {
    getProdService,
    getProdPIDService,
    createProdService,
    updateProdService,
    deleteProdService
} from '../services/products.service.js'

const getSort = (sort) => {
    if (!sort) { return 0 }
    if (sort === 'asc') { return 1 }
    if (sort === 'desc') { return -1 }
    return 0;
}

const getProdController = async (req, res) => {
    try {
        let limit = req.query.limit || process.env.DEFAULT_LIMIT;
        let page = req.query.page || process.env.DEFAULT_PAGE;
        let sort = req.query.sort || process.env.DEFAULT_SORT;

        let products = await getProdService(limit, page, getSort(sort));
        products = {
            status: 'success',
            payload: products.docs.map(item => item.toObject()),
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: (products.hasPrevPage == true) ? '/api/products?limit=' + limit + '&sort=' + sort + '&page=' + (parseInt(page) - 1) : null,
            nextLink: (products.hasNextPage == true) ? '/api/products?limit=' + limit + '&sort=' + sort + '&page=' + (parseInt(page) + 1) : null
        }
        req.session.user.visitas += 1; 
        if(process.env.TYPE_RESULT == 'VIEWS')
            res.render('products', {productos: products, session: req.session.user});
        else
            res.json(products);
    } catch (error) {
        res.render('errors', { error: error, link: '/login/iniciar', texto: "login" });
    }
}

const getPIDController = async (req, res) => {
    try {
        let product = await getProdPIDService(req.params.pid);
        res.json(
            {
                status: 'success',
                payload: product
            });
    } catch (error) {
        res.status(500).json({ "status": 'error', "message": `${error}` });
    }
}

const createProdController = async (req, res) => {
    try {
        let result = await createProdService(req.body);
        res.json({ status: "success", payload: result });
    } catch (error) {
        res.status(500).json({ "status": "error", "message": `${error}` });
    }
}

const updateProdController = async (req, res) => {
    try {
        let result = await updateProdService(req.params.pid, req.body);
        res.json({ status: "success", payload: result });
    } catch (error) {
        res.status(500).json({ "status": "error", "message": `${error}` });
    }
}

const deleteProdController = async (req, res) => {
    try {
        let result = await deleteProdService(req.params.pid);
        res.json({ status: "success", payload: result });
    } catch (error) {
        res.status(500).json({ status: "error", "message": `${error}` });
    }
}

export { getProdController, getPIDController, createProdController, updateProdController, deleteProdController };