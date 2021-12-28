import React from 'react';
import { Modal } from 'antd';
import SearchBar from '@/components/SearchBar';
import CustomTable from '@/components/CustomTable';
import { SearchRoleRelatedStaffInfoList } from '@/services/roleServices';


export default class RoleRelatedStaffModal extends React.Component {
    state = {
        searchParams: {
            staffLoginName: '',
            staffRealName: ''
        },
        pageParams: { from: 0, size: 10 },
        staffInfoList: [],
        staffInfoListTotalCount: 0
    }

    componentDidMount() {
        this.hadnleSearchRoleRelatedStaffInfoList();
    }

    // 搜索指定角色关联的成员信息列表
    hadnleSearchRoleRelatedStaffInfoList = async () => {
        const { searchParams, pageParams } = this.state;
        const res = await SearchRoleRelatedStaffInfoList({
            ...searchParams,
            ...pageParams
        });
        // const { staffInfoList, totalCount } = res;
        //////////////////////////////////////
        const totalCount = 1;
        const staffInfoList = [
            {
                "staffUUID": "c71c88d8-9066-4408-9135-a714c284335d",
                "staffLoginName": "ds",
                "staffRealName": "dengshuo",
                "staffSex": "male",
                "staffTel": "0755-1232223",
                "staffMobile": "15623566879",
                "staffEmail": "shuo.deng@foxmail.com",
                "staffStatus": 1,
                "staffCreatorUUID": "c71c88d8-9066-4408-9135-a714c28477d",
                "createdTime": "2021-1-11 17: 20: 00.005000",
                "lastModifiedTime": "2021-1-11 17: 20: 00.005000"
            }
        ]
        //////////////////////////////////////
        this.setState({ staffInfoList, staffInfoListTotalCount: totalCount });
    }

    // 搜索
    handleSearch = (searchParams) => {
        const { pageParams } = this.state;
        this.setState({ searchParams, pageParams: { ...pageParams, from: 0 } }, () => {
            this.hadnleSearchRoleRelatedStaffInfoList();
        })
    }

    // table分页
    handleTablePageChange = (pageParams) => {
        this.setState({ pageParams }, () => {
            this.hadnleSearchRoleRelatedStaffInfoList();
        });
    }


    render() {
        const { onCancel } = this.props;
        const { searchParams, pageParams, staffInfoList, staffInfoListTotalCount } = this.state;
        const { staffLoginName, staffRealName } = searchParams;

        const searchBarFields = {
            staffLoginName: {
                placeholder: '登录名',
                type: 'input',
                value: staffLoginName,
                width: '150px',
            },
            staffRealName: {
                placeholder: '成员姓名',
                type: 'input',
                value: staffRealName,
                width: '150px',
            },
        };


        const columns = [
            {
                title: '登录名',
                dataIndex: 'staffLoginName',
                width: 200
            },
            {
                title: '成员姓名',
                dataIndex: 'staffRealName',
                width: 200,
            },
            {
                title: 'Email',
                dataIndex: 'staffEmail'
            }
        ]

        return <Modal
            title="成员列表"
            width={900}
            visible={true}
            footer={null}
            onCancel={onCancel}
        >
            <SearchBar searchBarFields={searchBarFields} onSearch={this.handleSearch} />


            <CustomTable
                columns={columns}
                dataSource={staffInfoList}
                total={staffInfoListTotalCount}
                pageParams={pageParams}
                onChange={this.handleTablePageChange}
            />
        </Modal>
    }
}