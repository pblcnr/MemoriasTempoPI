const { createApp, ref } = Vue;

const app = createApp({
    data() {
        return {
            currentView: 'home',
            products: []
        };
    },
    methods: {
        showView(view) {
            this.currentView = view;
        },
        addProduct(product) {
            this.products.push(product);
            this.showView('home');
        }
    }
});

app.component('login-form', {
    template: `
        <form>
            <h2>Login</h2>
            <input type="email" placeholder="Email">
            <input type="password" placeholder="Senha">
            <button type="submit">Entrar</button>
        </form>
    `
});

app.component('register-form', {
    template: `
        <form>
            <h2>Cadastro</h2>
            <input type="text" placeholder="Nome completo">
            <input type="email" placeholder="Email">
            <input type="password" placeholder="Senha">
            <button type="submit">Registrar</button>
        </form>
    `
});

app.component('product-form', {
    template: `
        <form @submit.prevent="submit">
            <h2>Cadastrar Produto</h2>
            <input type="text" placeholder="Nome do Produto" v-model="product.name">
            <input type="text" placeholder="Descrição" v-model="product.description">
            <input type="number" placeholder="Preço" v-model="product.price">
            <button type="submit">Adicionar Produto</button>
        </form>
    `,
    data() {
        return {
            product: { name: '', description: '', price: 0 }
        };
    },
    methods: {
        submit() {
            this.$emit('add-product', { ...this.product });
        }
    }
});

app.component('product-list', {
    template: `
        <div>
            <h2>Produtos Disponíveis</h2>
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                </tr>
                <tr v-for="product in products" :key="product.name">
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.price }}</td>
                </tr>
            </table>
        </div>
    `,
    props: ['products']
});

app.mount('#app');