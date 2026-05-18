// Importar as funções do Model
const ProdutoModel = require('../models/produtosModel');

// ============================================================
// FUNÇÃO: listarTodos (ASSÍNCRONA)
// ROTA: GET /produtos
// DESCRIÇÃO: Lista todos os produtos do banco de dados
// ============================================================
async function listarTodos(req, res) {
  try {
    const produtos = await ProdutoModel.listarTodos();
    res.status(200).json(produtos);
  } catch (erro) {
    console.error('ERRO COMPLETO:', erro);

    res.status(500).json({
      mensagem: 'Erro ao listar produtos',
      erro: erro.message
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorId (ASSÍNCRONA)
// ROTA: GET /produtos/:id
// ============================================================
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const produto = await ProdutoModel.buscarPorId(id);
    
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ 
        mensagem: `Produto ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar produto',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: criar (ASSÍNCRONA)
// ROTA: POST /produtos
// ============================================================
async function criar(req, res) {
  try {

    console.log('BODY RECEBIDO:', req.body);

    const { nome, preco, estoque, categoria } = req.body;

    if (
      nome === undefined ||
      preco === undefined ||
      estoque === undefined ||
      categoria === undefined ||
      nome === '' ||
      categoria === ''
    ) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios'
      });
    }

    const novoProduto = await ProdutoModel.criar({
      nome,
      preco,
      estoque,
      categoria
    });

    console.log('PRODUTO CRIADO:', novoProduto);

    res.status(201).json(novoProduto);

  } catch (erro) {

    console.error('ERRO AO CRIAR:', erro);

    res.status(500).json({
      mensagem: 'Erro ao criar produto',
      erro: erro.message
    });
  }
}

// ============================================================
// FUNÇÃO: atualizar (ASSÍNCRONA)
// ROTA: PUT /produtos/:id
// ============================================================
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, preco, estoque, categoria } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nome || !preco || !estoque || !categoria) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const produtoAtualizado = await ProdutoModel.atualizar(id, { 
      nome, 
      preco, 
      estoque, 
      categoria 
    });
    
    if (produtoAtualizado) {
      res.status(200).json(produtoAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Produto ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar produto',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: deletar (ASSÍNCRONA)
// ROTA: DELETE /produtos/:id
// ============================================================
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const deletado = await ProdutoModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Produto ${id} removido com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Produto ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar produto',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorNome (ASSÍNCRONA)
// ROTA: GET /produtos/categoria/:categoria
// ============================================================
async function buscarPorNome(req, res) {
  try {
    const { nome } = req.params;
    const produtos = await ProdutoModel.buscarPorNome(nome);
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar produtos por nome',
      erro: erro.message 
    });
  }
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorNome
};
