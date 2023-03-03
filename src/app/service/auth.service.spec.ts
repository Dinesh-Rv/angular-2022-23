import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

fdescribe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a user observable when authenticated', () => {
    expect(service.applyLoginCredentials('token', '1234')).toBeTruthy();
  });

  // it('should return nothing when not authenticated', () => {
  //   expect(service.applyLoginCredentials('token', '1234')).toBeFalsy();
  // });
});
