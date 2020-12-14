import { parseTableFields, parseFormFields } from '@/scripts/constants'
export default {
    data() {
        return {
            // 公司地址
            companyAddressDialog: {
                visible: false,
                meta: {
                    result: [],
                },
            },
            // 公司准入
            companyPassDialog: {
                visible: false,
                meta: {
                    entName: '',
                    pripid: '', //3304810090252473
                },
            },
            // 地图查看
            markerDialog: {
                visible: false,
                gridCode: '',
                pGridCode: '',
                meta: {},
            },
            gridDialog: {
                meta: {},
                visible: false,
            },
        }
    },
    methods: {
        parseTableFields,
        parseFormFields,
        onUpdate(name, value) {
            const query = this.queryForm.model
            const queryRef = this.$refs['queryRef']
            // 一级网格选中后获取二级网格
            if (name === 'gridCodeBank') {
                const gridCodeUserRef = queryRef.getRefField('gridCodeUser')
                if (value) {
                    let pGridCode = value
                    gridCodeUserRef.filter(item => {
                        if (
                            item.value == '' ||
                            (item.$model && pGridCode === item.$model.pGridCode)
                        ) {
                            return true
                        } else {
                            return false
                        }
                    })
                    query.gridCodeUser = ''
                } else {
                    const gridCodeUserRef = queryRef.getRefField('gridCodeUser')
                    gridCodeUserRef.filter(item => {
                        return true
                    })

                    query.gridCodeUser = ''
                }
            }
            console.log('query', query)
        },
        // 删除企业
        async handleDelete(row, refName = 'tableRef') {
            try {
                await this.$confirm('确认从网格客户库中删除该企业吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                await this.$http.request({
                    url: '/cus/pool/del-ent-grid',
                    params: {
                        pripids: row.pripid,
                    },
                })
                this.$message.success('删除成功')

                this.$refs[refName].onLoad()
            } catch (err) {
                console.error(err)
            }
        },
        // 打开准入失败原因
        handleOpenPass(row) {
            this.companyPassDialog.meta = {
                ...row,
            }
            this.companyPassDialog.visible = true
            console.log('handleOpenPass', row)
        },
        // 打开公司位置
        handleOpenAddress(row) {
            if (row.mark) {
                this.companyAddressDialog.meta.result = [{ ...row }]
                this.companyAddressDialog.visible = true
            } else {
                this.$message.error('没有坐标')
            }

            console.log('handleOpenAddress', row)
        },
        handleOpenMarker() {
            const { gridState, gridStateStart } = this
            const {
                gridCodeBank = '',
                gridCodeUser = '',
            } = this.queryForm.model
            this.markerDialog.visible = true
            this.markerDialog.pGridCode = gridCodeBank
            this.markerDialog.gridCode = gridCodeUser
            this.markerDialog.meta = {
                gridState,
                gridStateStart,
                gridCodeBank,
                gridCodeUser,
            }
        },
        // 网格移动
        handleGridChange() {
            const selected = this.selected

            if (selected.length > 0) {
                this.gridDialog.meta = {
                    selected: [...selected],
                }
                this.gridDialog.visible = true
            } else {
                this.$message.warning('请至少选中1家公司')
            }
        },
    },
}
