class Globals{

}

class DevelopmentGlobals extends Globals{
    public urls = {
        register: "http://localhost:3000/register",
        login: "http://localhost:3000/login"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        register: "https://class132-9bd05.web.app/register",
        login: "https://class132-9bd05.web.app/login"
    }
}

const globals = process.env.NODE_ENV === "development" ? DevelopmentGlobals:ProductionGlobals

export default globals;