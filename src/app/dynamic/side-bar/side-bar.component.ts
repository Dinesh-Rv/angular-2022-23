import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Category } from 'src/app/category';
import { CommonService } from 'src/app/service/common.service';
import { ToDoService } from 'src/app/service/to-do.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Output() selectedCategoryEvent = new EventEmitter<Category>();
  selectedCategory!: Category;
  category!: string;
  newCategory!: Category;
  categories: Category[] = [];
  @Output() isVisible!: boolean;
  iconName: string = 'menu';
  constructor(
    private toDoService: ToDoService,
    private commonService: CommonService
  ) {}

  hideSideBar() {
    this.commonService.controlLeftSide();
  }

  addCategory(categoryName: string) {
    this.commonService.presentUser.subscribe((presentUser) => {
      if (!categoryName) {
        categoryName = environment.UNTITLED_CATEGORY_NAME;
      }
      let newCategory = {
        id: 0,
        name: categoryName,
        iconName: environment.USER_CATEGORY_ICON,
      };
      this.toDoService
        .addCategory(newCategory, presentUser.id, environment.CATEGORY)
        .subscribe((response) => {
          if (response) {
            this.newCategory = newCategory;
            this.toDoService.getCategories(presentUser.id).subscribe((categories) => {
              this.categories = categories as Category[];
            });
          }
        });
    });
  }

  ngOnInit() {
    this.commonService.presentCategory.subscribe((presentCategory) => {
      this.selectedCategory = presentCategory;
    });
  }
}
