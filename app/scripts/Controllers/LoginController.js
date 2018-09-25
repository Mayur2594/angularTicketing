angular.module('Ticketing')
.controller('universalController', ['$scope','$http','$route', 'Upload', function ($scope,$http,$route,Upload) {
	$scope.checkcurrpage=function(myValue){
			
			if(myValue == null || myValue == 0)
				myValue = 1;
			
		if(!myValue){
		 window.document.getElementById("mypagevalue").value = $scope.currentPage+1;
		 var element = window.document.getElementById("mypagevalue");
		 if(element)
			 element.focus();
		$scope.currentPage = $scope.currentPage;
		$scope.myValue = null;
		}
		
		else{
			$scope.dispval = "";
			if(myValue-1 <= 0){
				$scope.currentPage=0;
			}
			else{
				$scope.currentPage=myValue-1;
				
				if(!$scope.currentPage){$scope.currentPage=0;}
			}
		}};
			
			$scope.pagination = function(listdata)
			{
					$scope.recordsdisplay = [{value:10,name:10},{value:25,name:25},{value:50,name:50},{value:100,name:100},{value:listdata.length,name:'All'}]
					$scope.currentPage = 0;
					$scope.pageSize = 10;
					if($scope.myValue > listdata.length)
					{
						$scope.myValue = 1;
					}
					$scope.numberOfPages = function () {
						return Math.ceil(listdata.length / $scope.pageSize);
					};
					
						$(".loader").fadeOut("slow");
			};
			
		 $scope.enableColumns = function(header) {
			header.visible = !header.visible;
		  };
			
			
			$scope.exportData = function (report) {
						$scope.pageSize=10;
					$scope.currentPage=0;
					 var blob = new Blob([document.getElementById('exportable').innerHTML], {
						  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8" 
						 /* url: 'data:application/vnd.ms-excel;'  */
					   
					});
					saveAs(blob,report);
					$window.location.reload(); 
				};
						
			$scope.ShowHidePassword = function()
			{$("#showhide").toggleClass("glyphicon-eye-close");
						 var x = document.getElementById("password");
							if (x.type === "password") {
								x.type = "text";
								
							} else {
								x.type = "password";
							}
						
					
			};
			
			$scope.ForgotPasswordPanel = function(degree)
			{
						var elm = document.getElementById("flip-box-inner");
						elm.style.WebkitTransform = "rotateY(180deg)"; 
						// Code for IE9
						elm.style.msTransform = "rotateY(180deg)"; 
						// Standard syntax
						elm.style.transform = "rotateY(180deg)"; 
					
										
			};
			

			
			/* ----------------------------------------------------------------------- */
			
			
			
			$scope.ListDepartments = function()
			{
				$http({
					method: 'GET'
					, url: '/api/ListDepartments/'
					, dataType: 'jsonp'
					}).then(function (response) {
						$scope.departmentList = response.data;
						
						$scope.pagination($scope.departmentList); 
					});
			};
			
			$scope.ListDepts = function()
			{
				$http({
					method: 'GET'
					, url: '/api/ListDepts/'
					, dataType: 'jsonp'
					}).then(function (response) {
						$scope.departments = response.data;
						console.log($scope.departments)
					});
			};
			
			
			$scope.getDepartmentDetails = function(dptid)
			{
				$http({
					method: 'GET'
					, url: '/api/getDepartmentDetails/'+dptid
					, dataType: 'jsonp'
					}).then(function (response) {
						$scope.departmentDetails = response.data;
					});
			};
			
			$scope.deleteDepartmentDetails = function(dptid)
			{
				var yes = confirm('Are you sure? \n your record will paramently deleted from sysytem.')
				if(yes)
				{
					$http({
						method: 'DELETE'
						, url: '/api/deleteDepartmentDetails/'+dptid
						, dataType: 'jsonp'
						}).then(function (response) {
							alert(response.data.message);
							$scope.ListDepartments();
					});
				}
			};
			
			
			
			 $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };
 
    // upload on file select or drop
    $scope.upload = function (file) {
	 $scope.departmentDetails[0].createdby ="gdhd73dbddbdj"
        Upload.upload({
            url: '/api/SaveDetaptment',
            data: {file: file, departmentdata:$scope.departmentDetails}
        }).then(function (resp) {
            //alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            alert('Record inserted successfully');
			location.reload();
        }, function (resp) {
            //alert('Error status: ' + resp.status);
            alert('Something went wrong, Please try again!');
			location.reload();
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        }); 
    };
		
/* -----------------------------uers details */
		
		
		$scope.ListUsers = function()
			{
				$http({
					method: 'GET'
					, url: '/api/ListUsers/'
					, dataType: 'jsonp'
					}).then(function (response) {
						$scope.usersList = response.data;
						
						$scope.pagination($scope.usersList); 
						
						$scope.tablefields = [{name:'Fullname',field:'fullname',visible:true},{name:'Email',field:'email',visible:true},{name:'Username',field:'username',visible:true},{name:'Password',field:'password',visible:false},{name:'Userlevel',field:'userlevel',visible:false},{name:'Department',field:'department',visible:false}]
						
					});
			};
			
			$scope.getUsersDetails = function(selecteduerid)
			{
				$http({
					method: 'GET'
					, url: '/api/getUsersDetails/'+selecteduerid
					, dataType: 'jsonp'
					}).then(function (response) {
						$scope.userDetails = response.data;
					});
			};
			
			$scope.deleteUsersDetails = function(userid)
			{
				var yes = confirm('Are you sure? \n your record will paramently deleted from sysytem.')
				if(yes)
				{
					$http({
						method: 'DELETE'
						, url: '/api/deleteUsersDetails/'+userid
						, dataType: 'jsonp'
						}).then(function (response) {
							alert(response.data.message);
							$scope.ListUsers();
					});
				}
			};
			
		$scope.SaveUsersDetails = function()
		{
			$http({
				 method  : 'POST',
				 url     : 'api/SaveUsersDetails/',
				 data    : $scope.userDetails[0],
				 headers : {'Content-Type': 'application/json'} 
			}).then(function(response)
			{
				alert(response.data.message);
				$scope.userDetails =[];
				$scope.ListUsers();
			});
		};
		
		
		$scope.UserAuth = function()
		{
			$http({
				 method  : 'POST',
				 url     : 'api/UserAuth/',
				 data    : $scope.user,
				 headers : {'Content-Type': 'application/json'} 
			}).then(function(response)
			{
				console.log(response)
				/* if(response.success)
				{
					
				}
				else
				{
					$scope.errormessage= response.message;
				} */
			});
		};
		
	
}]);
	