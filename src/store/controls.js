export default {
	state : {
		staffinfo:null,
		departmentname:'',
		departseq:'',
		department:[],
		customerinfo:null
	},
	mutations: {
		setstaffinfo(state,staffinfo){
			state.staffinfo=staffinfo;
		},
		setdepartmentname(state,departmentname){
			state.departmentname=departmentname;
		},
		setdepartseq(state,departseq){
			state.departseq=departseq;
		},
		setdepartment(state,department){
			state.department=department;
		},
		setcustomerinfo(state,customerinfo){
			state.customerinfo=customerinfo;
		}
	}
}