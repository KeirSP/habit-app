import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Login from '../components/Login'
import { MemoryRouter } from 'react-router-dom';


describe('<Login />', () => {
    it('mounts to DOM', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
  
    let wrapper;

    beforeEach(() => wrapper = shallow(<Login.WrappedComponent />));
    
    it('Renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
  
    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render a <input />', () => {
        expect(wrapper.find('input').length).toEqual(2);
    });
  
    it('should render a <buton />', () => {
        expect(wrapper.find('button').length).toEqual(1);
    });

    it('should render a <form />', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });

   
    it('should fetch user data', () => {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
        json: () => mockJsonPromise,
        });
        wrapper.find('button').simulate('click')
        jest.spyOn(window, 'fetch').mockImplementation(() => mockFetchPromise);
        expect(global.fetch).toBeCalled();

    });
  
  })

describe('Test case for testing login',() =>{
    let wrapper;


    test('username check',()=>
    {
        wrapper = shallow(<Login.WrappedComponent />);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'susan'}});
        expect(wrapper.state('userName')).toEqual('susan');
    })

    it('password check',()=>{
        wrapper = shallow(<Login.WrappedComponent />);
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'susan123'}});
        expect(wrapper.state('password')).toEqual('susan123');
    })

    it('login check with right data',()=>{
        wrapper = shallow(<Login.WrappedComponent />);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'susan'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'susan123'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('loading')).toBe(false);
    })

    it('login check with wrong data',()=>{
        wrapper = shallow(<Login.WrappedComponent />);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'susan'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'susan123'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('loading')).toBe(false);
        })

    })