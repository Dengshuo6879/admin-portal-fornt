import React from 'react';
import { Tag } from 'antd';
import LayoutBox from '@/components/LayoutBox';
import SearchBar from '@/components/SearchBar';
import CustomTable from '@/components/CustomTable';
import { SearchLogInfoList, GetLogTypeInfoList } from '@/services/logServices';
import { QueryStaffInfo } from '@/services/staffServices';
import { cutoutTime } from '@/utils/utils';

export default class LogMgmt extends React.Component {
    state = {
        searchParams: {
            logStartDate: '',
            logEndDate: '',
            staffRealName: '',
            logType: undefined
        },
        pageParams: { from: 0, size: 10 },
        logTypeInfoList: [],
        logInfoList: [],
        logInfoListTotalCount: 0,
        staffInfoObj: {}
    }
    logInfoObj = {}

    componentDidMount() {
        this.handleGetLogTypeInfoList();
        this.handleSearchLogInfoList();
    }

    // 搜索日志信息列表
    handleSearchLogInfoList = async () => {
        const res = await SearchLogInfoList();
        // const { logInfoList, totalCount } = res;

        ////////////////////////////////////
        const logInfoList = [
            {
                "logUUID": "c71c88d8-9066-4408-9135-a714c284335d",
                "staffUUID": "c71c88d8-9066-4408-9135-a714c284335d",
                "operationIP": "12.11.2.12",
                "logTime": "2021-1-11 17:20:00.005000",
                "logType": "modify_staff",
                "logDesc": "修改资料"
            },
            {
                "logUUID": "c71c88d8-9066-4408-9135-a714c2843353",
                "staffUUID": "c71c88d8-9066-4408-9135-a714c284335d",
                "operationIP": "12.11.2.12",
                "logTime": "2021-1-11 17:20:00.005000",
                "logType": "modify_pwd",
                "logDesc": "修改密码"
            }
        ]
        const totalCount = 2
        ////////////////////////////////////

        logInfoList.map(logInfo => {
            this.handleQueryStaffInfo(logInfo.staffUUID);
        });
        this.setState({ logInfoList, logInfoListTotalCount: totalCount });
    }

    // 获取日志类型列表
    handleGetLogTypeInfoList = async () => {
        const res = await GetLogTypeInfoList();
        // const { logTypeInfoList = [] } = res;

        ////////////////////////////////
        const logTypeInfoList = [
            {
                logType: 'modify_staff',
                logTypeName: '修改资料',
            },
            {
                logType: 'modify_pwd',
                logTypeName: '修改密码',
            }
        ]
        ////////////////////////////////


        logTypeInfoList.map(logTypeInfo => {
            const { logType, logTypeName } = logTypeInfo;
            this.logInfoObj[logType] = logTypeName;
        })

        this.setState({ logTypeInfoList });
    }

    // 查询成员信息
    handleQueryStaffInfo = async (staffUUID) => {
        const { staffInfoObj } = this.state;
        if (staffInfoObj[staffUUID]) return

        const res = await QueryStaffInfo({ staffUUID });
        const { staffInfo } = res;
        staffInfoObj[staffUUID] = staffInfo;
        this.setState({ staffInfoObj });
    }

    // 搜索
    handleSearch = (searchParams) => {
        const { pageParams } = this.state;
        this.setState({ searchParams, pageParams: { ...pageParams, from: 0 } }, () => {
            this.handleSearchLogInfoList();
        })
    }

    // table分页
    handleTablePageChange = (pageParams) => {
        this.setState({ pageParams }, () => {
            this.handleSearchLogInfoList();
        });
    }


    render() {
        const { searchParams, pageParams, logTypeInfoList, logInfoList, logInfoListTotalCount, staffInfoObj } = this.state;
        const { logStartDate, logEndDate, staffRealName, logType } = searchParams;

        // 操作类型
        const logTypeOptions = [];
        logTypeInfoList.map(logTypeInfo => {
            logTypeOptions.push({
                label: logTypeInfo.logTypeName, value: logTypeInfo.logType
            })
        });

        const searchBarFields = {
            // dateRange: {
            //     type: 'dateRange',
            //     value: { startDate: logStartDate, endDate: logEndDate },
            //     lable: '操作时间'
            // },
            staffRealName: {
                placeholder: '操作者',
                type: 'input',
                value: staffRealName,
                width: '150px',
            },
            logType: {
                placeholder: '操作类型',
                type: 'select',
                value: logType,
                options: logTypeOptions
            },
        }

        const columns = [
            {
                title: '操作者',
                dataIndex: 'staffUUID',
                width: 300,
                render: (text) => {
                    const staffInfo = staffInfoObj[text] || {};
                    return staffInfo.staffRealName
                }
            },
            {
                title: '操作IP',
                dataIndex: 'operationIP',
            },
            {
                title: '操作时间',
                dataIndex: 'logTime',
                render: (text) => cutoutTime(text, 'sec')
            },
            {
                title: '操作类型',
                dataIndex: 'logType',
                render: (text) => <Tag color={'processing'}>{this.logInfoObj[text]}</Tag>
            },
            {
                title: '描述',
                dataIndex: 'logDesc',
                width: 400
            }
        ]
        return <LayoutBox>
            <SearchBar searchBarFields={searchBarFields} onSearch={this.handleSearch} />

            <CustomTable
                columns={columns}
                dataSource={logInfoList}
                total={logInfoListTotalCount}
                pageParams={pageParams}
                onChange={this.handleTablePageChange}
            />

        </LayoutBox>
    }
}