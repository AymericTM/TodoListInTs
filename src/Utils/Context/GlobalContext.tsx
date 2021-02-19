import { createContext } from 'react';
export interface GlobalContextState {
    name: string;
    surname: string;
    email: string;
    id: string;
    authenticated: boolean | null;
}

export type GlobalContextOptional = Partial<GlobalContextState>;

export interface GlobalContextInterface extends GlobalContextState {
    updateGlobalContext: (state: GlobalContextOptional) => void;
}

const initialContextState: GlobalContextState = {
    email: '',
    id: '',
    name: '',
    surname: '',
    authenticated: null
};

const GlobalContext = createContext<GlobalContextInterface>({
    ...initialContextState,
    updateGlobalContext: () => { }
})

export { GlobalContext, initialContextState };