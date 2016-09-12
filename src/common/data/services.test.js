'use strict';

describe('Services module', function () {

    var httpBackend,
        ServiceInstance,
        serviceEndpoint;

    beforeEach(module('common.configuration'));
    beforeEach(module('common.data'));

    beforeEach(inject(function ($httpBackend, Services, SERVICE_ENDPOINT) {
        httpBackend = $httpBackend;
        ServiceInstance = Services;
        serviceEndpoint = SERVICE_ENDPOINT;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('Service "Services"', function () {

        it('should have method get defiwhened', function () {
            expect(ServiceInstance.get).toBeDefined();
        });

        it('should make service call with passed para]meter and return promise', function () {
            var response = {data: 'something about beer'};
            httpBackend.expectGET(serviceEndpoint + '/beer/rand?param1=Ace').respond(response);
            ServiceInstance.get('/beer/rand',{param1:'Ace'});
            httpBackend.flush();

            httpBackend.expectGET(serviceEndpoint + '/beer/rand').respond(response);
            ServiceInstance.get('/beer/rand');
            httpBackend.flush();
        });
    });
});