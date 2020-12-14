import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
// import { createAxios } from '../../src/scripts/http/index.js'
// console.log(1, createAxios)
describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message'
        const wrapper = shallowMount(HelloWorld, {
            propsData: { msg },
        })
        expect(wrapper.text()).toMatch(msg)
    })
})
