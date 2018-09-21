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
						$(".loader").fadeOut("slow");
						$scope.pagination($scope.departmentList); 
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
			$scope.ListDepartments();
        }, function (resp) {
            //alert('Error status: ' + resp.status);
            alert('Something went wrong, Please try again!');
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        }); 
    };
			
	
}]);
	